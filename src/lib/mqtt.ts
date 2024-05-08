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
  gyroscopeStore,
} from '@/stores/sensor.data.store';
import outputStore from '@/stores/output.store';
import { toast } from 'svelte-sonner';
import { addLog } from '@/stores/log.store';
import { parseTelemetryData } from './helpers/helper';

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

          const telemetryData = parseTelemetryData(decoder.decode(message));
          const time = new Date();
          outputStore.updateOutput({
            teamId: telemetryData.TEAM_ID,
            missionTime: telemetryData.MISSION_TIME,
            packetCount: telemetryData.PACKET_COUNT,
            activeMode: 'Flight',
            activeState: 'Ground',
            altitude: telemetryData.ALTITUDE,
            airSpeed: telemetryData.AIR_SPEED,
            hsDeployed: telemetryData.HS_DEPLOYED,
            pcDeployed: telemetryData.PC_DEPLOYED,
            temperature: telemetryData.TEMPERATURE,
            voltage: telemetryData.VOLTAGE,
            pressure: telemetryData.PRESSURE,
            gpsTime: telemetryData.GPS_TIME,
            gpsAltitude: telemetryData.GPS_ALTITUDE,
            gpsLatitude: telemetryData.GPS_LATITUDE,
            gpsLongitude: telemetryData.GPS_LONGITUDE,
            // gpsStas: telemetryData.GPS_STATUS,
          });

          altitudeStore.updateAltitude({
            time,
            value: telemetryData.ALTITUDE,
          });

          airPressureStore.updateAirPressure({
            time,
            value: telemetryData.PRESSURE,
          });

          temperatureStore.updateTemperature({
            time,
            value: telemetryData.TEMPERATURE,
          });

          batteryVoltageStore.updateBatteryVoltage({
            time,
            value: telemetryData.VOLTAGE,
          });

          tiltAngleStore.updateTiltAngle({
            time,
            value: {
              x: telemetryData.TILT_X,
              y: telemetryData.TILT_Y,
              z: telemetryData.ROT_Z,
            },
          });

          airSpeedStore.updateAirSpeed({
            time,
            value: telemetryData.AIR_SPEED,
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
