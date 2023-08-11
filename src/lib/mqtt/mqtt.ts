import mqtt from 'mqtt';
import type { Topics } from './types';
import container from './container';

// MQTT handler
const createMqttHandler = () => {
  const mqttClient = mqtt.connect('ws://127.0.0.1:8080');
  const Container = container(mqttClient);

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
      case 'payload/temperature':
        // Payload.onTempMessage({ message: decodedMessage, topic });
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
    container: Container
  };
};

const mqttHandler = createMqttHandler();
export default mqttHandler;
