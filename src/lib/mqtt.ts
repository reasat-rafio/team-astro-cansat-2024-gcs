import mqtt from 'mqtt';
import type { MqttPayloadTopic, TelemetryData } from './@types/app.types';
import {
  airPressureStore,
  airSpeedStore,
  altitudeStore,
  batteryVoltageStore,
  temperatureStore,
  tiltAngleStore,
  gpsCoordinatesStore,
} from '@/stores/sensor.data.store';
import outputStore from '@/stores/output.store';
import { toast } from 'svelte-sonner';
import { addLog } from '@/stores/log.store';
import formatTime from './helpers/format-date';
import { processTelemetryData } from './helpers/telemetry-data';
import { get } from 'svelte/store';

// MQTT handler
const createMqttHandler = () => {
  const mqttClient = mqtt.connect('ws://127.0.0.1:8080');

  mqttClient.on('error', (err) => {
    toast.error(`Error: ${err}`);
    addLog({ value: `Error: ${err}`, time: new Date(), state: 'error' });
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
