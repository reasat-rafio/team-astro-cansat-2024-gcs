import commandHistoryStore from '@/stores/command.history.store';
import { addLog } from '@/stores/log.store';
import outputStore from '@/stores/output.store';
import rowTelemetryStore from '@/stores/row-telemetry';
import {
  airPressureStore,
  airSpeedStore,
  altitudeStore,
  batteryVoltageStore,
  gpsCoordinatesStore,
  temperatureStore,
  tiltAngleStore,
} from '@/stores/sensor.data.store';
import systemStepsStore from '@/stores/system.steps.store';
import getSuccessOutput from '@/stores/terminal/helpers/get-current-success-output';
import terminalStore from '@/stores/terminal/terminal.store';
import mqtt from 'mqtt';
import { toast } from 'svelte-sonner';
import { get } from 'svelte/store';
import type { MqttPayloadTopic, TelemetryData } from './@types/app.types';
import formatTime from './helpers/format-date';
import {
  processResponseData,
  processTelemetryData,
} from './helpers/telemetry-data';

// MQTT handler
const createMqttHandler = () => {
  const mqttClient = mqtt.connect('ws://127.0.0.1:8080');

  mqttClient.on('error', (err) => {
    toast.error(`Error: ${err}`);
    addLog({ value: `${err}`, time: new Date(), state: 'error' });
    mqttClient.end();
  });

  mqttClient.on('connect', () => {
    addLog({
      value: `MQTT client connected`,
      time: new Date(),
      state: 'success',
    });
    toast.success(`MQTT client connected`);
  });

  mqttClient.on('reconnect', () => {
    toast.info(`Reconnecting to MQTT server`);
  });

  mqttClient.on(
    'message',
    async (topic: MqttPayloadTopic, message: BufferSource) => {
      const decoder = new TextDecoder('utf8');

      switch (topic) {
        case 'telemetry/data':
          addLog({
            value: `Received telemetry data:  ${message}`,
            time: new Date(),
            state: 'info',
          });

          const telemetryData = processTelemetryData(decoder.decode(message));
          const time = formatTime(new Date());

          if (!telemetryData.isValid) {
            outputStore.incrementUnhealthyPacket();

            addLog({
              value: `Invalid telemetry data received: ${telemetryData.data}`,
              time: new Date(),
              state: 'error',
            });

            break;
          }

          // if the  data is valid, update the output store
          rowTelemetryStore.updateTelemetry(decoder.decode(message));

          const t = telemetryData.data as TelemetryData;
          const lastPacketCount = parseInt(get(outputStore).packetCount);
          const currentPacketCount = t.PACKET_COUNT;
          const packetLoss = lastPacketCount - currentPacketCount;
          if (packetLoss > 1) {
            outputStore.updatePacketLoss(packetLoss);
          }

          outputStore.updateOutput({
            teamId: t.TEAM_ID,
            missionTime: String(t.MISSION_TIME),
            activeMode: t.MODE,
            packetCount: String(t.PACKET_COUNT),
            activeState: t.STATE,
            altitude: String(t.ALTITUDE),
            airSpeed: String(t.AIR_SPEED),
            hsDeployed: t.HS_DEPLOYED,
            pcDeployed: t.PC_DEPLOYED,
            temperature: String(t.TEMPERATURE),
            voltage: String(t.VOLTAGE),
            pressure: String(t.PRESSURE),
            gpsTime: t.GPS_TIME,
            gpsAltitude: t.GPS_ALTITUDE,
            gpsLatitude: t.GPS_LATITUDE,
            gpsLongitude: t.GPS_LONGITUDE,
            gpsStas: t.GPS_SATS,
            tiltX: String(t.TILT_X),
            tiltY: String(t.TILT_Y),
            rotZ: String(t.ROT_Z),
            cmdEcho: t.CMD_ECHO,
          });

          altitudeStore.updateAltitude({
            time,
            value: String(t.ALTITUDE),
          });

          airPressureStore.updateAirPressure({
            time,
            value: String(t.PRESSURE),
          });

          temperatureStore.updateTemperature({
            time,
            value: String(t.TEMPERATURE),
          });

          batteryVoltageStore.updateBatteryVoltage({
            time,
            value: String(t.VOLTAGE),
          });

          tiltAngleStore.updateTiltAngle({
            time,
            value: {
              x: String(t.TILT_X),
              y: String(t.TILT_Y),
              z: String(t.ROT_Z),
            },
          });

          airSpeedStore.updateAirSpeed({
            time,
            value: String(t.AIR_SPEED),
          });

          gpsCoordinatesStore.updateGpsCoordinates({
            time,
            value: {
              x: t.GPS_LATITUDE,
              y: t.GPS_LONGITUDE,
              z: t.GPS_ALTITUDE,
            },
          });

          break;

        case 'ground_station/commands_response':
          const response = processResponseData(decoder.decode(message));

          if (!response.isValid) {
            addLog({
              value: `Invalid command response received: ${response.data}`,
              time: new Date(),
              state: 'error',
            });
            break;
          }

          if (typeof response.data !== 'string') {
            const { currentCommand } = get(terminalStore);

            switch (response.data.command) {
              case 'CAL':
                if (!currentCommand) return;

                commandHistoryStore.setCommandHistory({
                  ...currentCommand,
                  status: 'success',
                  output: `<p class="text-green-600">${currentCommand.value} executed successfully. ${response.data.message}</p>`,
                });

                addLog({
                  value: `${currentCommand.value} executed successfully. ${response.data.message}`,
                  time: new Date(),
                  state: 'success',
                });

                break;

              case 'SIM/ACTIVATE':
                switch (response.data.status) {
                  case 'SUCCESS':
                    if (!currentCommand) return;

                    const successMessage = getSuccessOutput(
                      currentCommand.value,
                    );

                    commandHistoryStore.setCommandHistory({
                      ...currentCommand,
                      status: 'success',
                      output: `<p class="text-green-600">${currentCommand.value} executed successfully. ${successMessage}</p>`,
                    });

                    addLog({
                      value: `${currentCommand.value} executed successfully. ${successMessage}`,
                      time: new Date(),
                      state: 'success',
                    });

                    systemStepsStore.setSimulationEnable('done');
                    systemStepsStore.setSimulationActivate('done');

                    break;
                  case 'FAILED':
                    if (!currentCommand) return;
                    commandHistoryStore.setCommandHistory({
                      ...currentCommand,
                      status: 'error',
                      output: `<p class="text-red-600">${currentCommand.value} failed. ${response.data.message.toLowerCase()}</p>`,
                    });

                    addLog({
                      value: `${currentCommand.value} failed. ${response.data.message.toLowerCase()}`,
                      time: new Date(),
                      state: 'error',
                    });

                    systemStepsStore.setSimulationActivate('error');
                    break;
                }

                break;
              case 'SIM/ENABLE':
                switch (response.data.status) {
                  case 'SUCCESS':
                    const { currentCommand } = get(terminalStore);
                    if (!currentCommand) return;

                    const successMessage = getSuccessOutput(
                      currentCommand.value,
                    );

                    commandHistoryStore.setCommandHistory({
                      ...currentCommand,
                      status: 'success',
                      output: `<p class="text-green-600">${currentCommand.value} executed successfully. ${successMessage}</p>`,
                    });

                    addLog({
                      value: `${currentCommand.value} executed successfully. ${successMessage}`,
                      time: new Date(),
                      state: 'success',
                    });

                    systemStepsStore.setSimulationEnable('done');
                    break;
                  case 'FAILED':
                    systemStepsStore.setSimulationEnable('error');
                    break;
                }

                break;

              case 'SIM/DISABLE':
                switch (response.data.status) {
                  case 'SUCCESS':
                    const { currentCommand } = get(terminalStore);
                    if (!currentCommand) return;

                    const successMessage = getSuccessOutput(
                      currentCommand.value,
                    );

                    commandHistoryStore.setCommandHistory({
                      ...currentCommand,
                      status: 'success',
                      output: `<p class="text-green-600">${currentCommand.value} executed successfully. ${successMessage}</p>`,
                    });

                    addLog({
                      value: `${currentCommand.value} executed successfully. ${successMessage}`,
                      time: new Date(),
                      state: 'success',
                    });

                    systemStepsStore.setSimulationEnable('notStarted');
                    systemStepsStore.setSimulationActivate('notStarted');
                    break;
                  case 'FAILED':
                    systemStepsStore.setSimulationEnable('error');
                    break;
                }

                break;
            }
          }

          break;

        default:
          break;
      }
    },
  );

  mqttClient.on('close', () => {
    toast.info(`MQTT client disconnected`);
  });

  return {
    client: mqttClient,
    subscribe: (topic: MqttPayloadTopic) => {
      mqttClient.subscribe(topic);
    },
  };
};

const mqttHandler = createMqttHandler();
export default mqttHandler;
