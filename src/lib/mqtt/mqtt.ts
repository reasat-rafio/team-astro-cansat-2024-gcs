import mqtt from 'mqtt';
import type { Topics } from './types';
import payload from './payload';

// MQTT handler
const createMqttHandler = () => {
  const mqttClient = mqtt.connect('ws://127.0.0.1:8080');
  const Payload = payload(mqttClient);

  mqttClient.on('error', (err) => {
    console.log(`ERROR: ${err}`);
    mqttClient.end();
  });

  mqttClient.on('connect', () => {
    console.log(`mqtt client connected`);
  });

  mqttClient.on('message', async (topic: Topics, message: BufferSource) => {
    const decoder = new TextDecoder('utf8');
    const decodedMessage = decoder.decode(message);

    switch (topic) {
      case 'payload/altitude':
        Payload.message.altitude({ message: decodedMessage, topic });
        break;

      case 'payload/air_pressure':
        Payload.message.airPressure({ message: decodedMessage, topic });
        break;

      case 'payload/temperature':
        Payload.message.temperature({ message: decodedMessage, topic });
        break;

      case 'payload/battery_voltage':
        Payload.message.batteryVoltage({ message: decodedMessage, topic });
        break;

      case 'payload/tilt_angle':
        Payload.message.tiltAngle({ message: decodedMessage, topic });
        break;

      case 'payload/air_speed':
        Payload.message.airSpeed({ message: decodedMessage, topic });
        break;

      case 'payload/command_echo':
        Payload.message.commandEcho({ message: decodedMessage, topic });
        break;

      case 'payload/gps_coordinates':
        Payload.message.gpsCoordinates({ message: decodedMessage, topic });
        break;

      case 'payload/longitude':
        Payload.message.longitude({ message: decodedMessage, topic });
        break;

      case 'payload/satellites_tracked':
        Payload.message.satellitesTracked({ message: decodedMessage, topic });
        break;

      case 'payload/gyroscope':
        Payload.message.gyroscope({ message: decodedMessage, topic });
        break;

      default:
        break;
    }
  });

  mqttClient.on('close', () => {
    console.log(`mqtt client disconnected`);
  });

  return {
    mqttClient,
    isConnected: () => mqttClient.connected,
    payload: Payload
  };
};

const mqttHandler = createMqttHandler();
export default mqttHandler;
