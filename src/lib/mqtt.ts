import mqtt from 'mqtt';
import type { MqttPayloadTopic } from './@types/app.types';
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

// MQTT handler
const createMqttHandler = () => {
  const mqttClient = mqtt.connect('ws://127.0.0.1:8080');

  mqttClient.on('error', (err) => {
    toast.error(`Error: ${err}`);
    addLog({ value: `Error: ${err}`, time: new Date() });
    mqttClient.end();
  });

  mqttClient.on('connect', () => {
    addLog({ value: `MQTT client connected`, time: new Date() });
    toast.success(`MQTT client connected`);
  });

  mqttClient.on(
    'message',
    async (topic: MqttPayloadTopic, message: BufferSource) => {
      const decoder = new TextDecoder('utf8');
      // const decodedMessage = JSON.parse(decoder.decode(message)) as {
      //   value: number;
      // };

      switch (topic) {
        case 'telemetry/data':
          addLog({
            value: `Received telemetry data:  ${message}`,
            time: new Date(),
          });

          const telemetryData = processTelemetryData(decoder.decode(message));
          const time = formatTime(new Date());

          if (!telemetryData) break;

          outputStore.updateOutput({
            teamId: telemetryData.TEAM_ID,
            missionTime: String(telemetryData.MISSION_TIME),
            packetCount: String(telemetryData.PACKET_COUNT),
            activeMode: telemetryData.MODE,
            activeState: telemetryData.STATE,
            altitude: String(telemetryData.ALTITUDE),
            airSpeed: String(telemetryData.AIR_SPEED),
            hsDeployed: telemetryData.HS_DEPLOYED,
            pcDeployed: telemetryData.PC_DEPLOYED,
            temperature: String(telemetryData.TEMPERATURE),
            voltage: String(telemetryData.VOLTAGE),
            pressure: String(telemetryData.PRESSURE),
            gpsTime: telemetryData.GPS_TIME,
            gpsAltitude: telemetryData.GPS_ALTITUDE,
            gpsLatitude: telemetryData.GPS_LATITUDE,
            gpsLongitude: telemetryData.GPS_LONGITUDE,
            gpsStas: telemetryData.GPS_SATS,
            tiltX: String(telemetryData.TILT_X),
            tiltY: String(telemetryData.TILT_Y),
            rotZ: String(telemetryData.ROT_Z),
            cmdEcho: telemetryData.CMD_ECHO,
          });

          altitudeStore.updateAltitude({
            time,
            value: String(telemetryData.ALTITUDE),
          });

          airPressureStore.updateAirPressure({
            time,
            value: String(telemetryData.PRESSURE),
          });

          temperatureStore.updateTemperature({
            time,
            value: String(telemetryData.TEMPERATURE),
          });

          batteryVoltageStore.updateBatteryVoltage({
            time,
            value: String(telemetryData.VOLTAGE),
          });

          tiltAngleStore.updateTiltAngle({
            time,
            value: {
              x: String(telemetryData.TILT_X),
              y: String(telemetryData.TILT_Y),
              z: String(telemetryData.ROT_Z),
            },
          });

          airSpeedStore.updateAirSpeed({
            time,
            value: String(telemetryData.AIR_SPEED),
          });

          gpsCoordinatesStore.updateGpsCoordinates({
            time,
            value: {
              x: telemetryData.GPS_LATITUDE,
              y: telemetryData.GPS_LONGITUDE,
              z: telemetryData.GPS_ALTITUDE,
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
