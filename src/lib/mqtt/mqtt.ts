import mqtt from 'mqtt';
import chalk from 'chalk';
import Container from './actions/container';
import Payload from './actions/payload';

// MQTT handler
const createMqttHandler = () => {
  const mqttClient = mqtt.connect('ws://127.0.0.1:8080');

  mqttClient.on('error', (err) => {
    console.log(`ERROR: ${err}`);
    mqttClient.end();
  });

  mqttClient.on('connect', () => {
    console.log(`mqtt client connected`);
  });

  mqttClient.on('message', async (topic, message) => {
    const decoder = new TextDecoder('utf8');
    const decodedMessage = decoder.decode(message);

    switch (topic) {
      case 'container/temperature':
        Container.onTempMessage({ message: decodedMessage, topic });
        break;
      case 'payload/temperature':
        Payload.onTempMessage({ message: decodedMessage, topic });
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
    subToContainerTemp: () => Container.subTemp(mqttClient),
    pubContainerTemperature: () => Container.pubTemp(mqttClient)
  };
};

const mqttHandler = createMqttHandler();
export default mqttHandler;
