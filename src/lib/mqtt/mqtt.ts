import mqtt from 'mqtt';
import type { Topics } from './types';
import container from './container';
import payload from './payload';

// MQTT handler
const createMqttHandler = () => {
  const mqttClient = mqtt.connect('ws://127.0.0.1:8080');
  const Container = container(mqttClient);
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
      case 'container/temperature':
        Container.message.temperature({ message: decodedMessage, topic });
        break;

      case 'container/altitude':
        Container.message.altitude({ message: decodedMessage, topic });
        break;

      case 'container/gyroscope':
        Container.message.gyroscope({ message: decodedMessage, topic });
        break;

      case 'container/acceleration':
        Container.message.acceleration({ message: decodedMessage, topic });
        break;

      case 'container/humidity':
        Container.message.humidity({ message: decodedMessage, topic });
        break;

      case 'container/pressure':
        Container.message.pressure({ message: decodedMessage, topic });
        break;

      // case 'container/separatorLine':
      //   Container.message.separatorLine({ message: decodedMessage, topic });
      //   break;

      case 'payload/temperature':
        Payload.message.temperature({ message: decodedMessage, topic });
        break;

      case 'payload/altitude':
        Payload.message.altitude({ message: decodedMessage, topic });
        break;

      case 'payload/gyroscope':
        Payload.message.gyroscope({ message: decodedMessage, topic });
        break;

      case 'payload/acceleration':
        Payload.message.acceleration({ message: decodedMessage, topic });
        break;

      case 'payload/humidity':
        Payload.message.humidity({ message: decodedMessage, topic });
        break;

      case 'payload/pressure':
        Payload.message.pressure({ message: decodedMessage, topic });
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
    container: Container,
    payload: Payload
  };
};

const mqttHandler = createMqttHandler();
export default mqttHandler;
