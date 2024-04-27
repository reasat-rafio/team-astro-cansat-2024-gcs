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
import { toast } from 'svelte-sonner';

// MQTT handler
const createMqttHandler = () => {
  const mqttClient = mqtt.connect('ws://127.0.0.1:8080');

  mqttClient.on('error', (err) => {
    toast.error(`Error: ${err}`);
    mqttClient.end();
  });

  mqttClient.on('connect', () => {
    toast.success(`MQTT client connected`);
  });

  mqttClient.on(
    'message',
    async (topic: MqttPayloadTopic, message: BufferSource) => {
      const decoder = new TextDecoder('utf8');
      const decodedMessage = JSON.parse(decoder.decode(message)) as {
        value: number;
      };

      console.log({ decodedMessage });

      switch (topic) {
        case 'altitude':
          altitudeStore.updateAltitude({
            time: new Date(),
            value: String(decodedMessage.value),
          });

          break;

        case 'air_pressure':
          airPressureStore.updateAirPressure({
            time: '2021-09-01T00:00:00Z',
            value: String(decodedMessage.value),
          });

          break;

        case 'temperature':
          temperatureStore.updateTemperature({
            time: '',
            value: String(decodedMessage.value),
          });

          break;

        case 'battery_voltage':
          batteryVoltageStore.updateBatteryVoltage({
            time: '',
            value: String(decodedMessage.value),
          });
          break;

        case 'tilt_angle':
          tiltAngleStore.updateTiltAngle({
            time: '',
            value: { x: '0', y: '0', z: '0' },
          });

          break;

        case 'air_speed':
          airSpeedStore.updateAirSpeed({
            time: '',
            value: String(decodedMessage.value),
          });

          break;

        case 'command_echo':
          // gcsService.send({
          //   type: 'U',
          //   airSpeed: decodedMessage as StringData
          // });
          break;

        case 'gps_coordinates':
          gpsCoordinatesStore.updateGpsCoordinates({
            time: '',
            value: { x: '0', y: '0', z: '0' },
          });

          break;

        case 'longitude':
          //   gcsService.send({
          //     type: 'UPDATE_LONGITUDE',
          //     longitude: decodedMessage as StringData,
          //   });
          break;

        case 'satellites_tracked':
          //   gcsService.send({
          //     type: 'UPDATE_SATELLITES_TRACKED',
          //     satellitesTracked: decodedMessage as StringData,
          //   });
          break;

        case 'gyroscope':
          gyroscopeStore.updateGyroscope({
            time: '',
            value: { x: '0', y: '0', z: '0' },
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
