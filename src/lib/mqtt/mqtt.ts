import mqtt from 'mqtt';
import chalk from 'chalk';
import temperatureStore from '@stores/temperature';
import type { Topics } from './types';
import { onTempMessage } from './actions/container';

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

  mqttClient.on('message', async (topic: Topics, message: BufferSource) => {
    const decoder = new TextDecoder('utf8');
    const decodedMessage = decoder.decode(message);

    switch (topic) {
      case 'container/temperature':
        onTempMessage({ message: decodedMessage });
        break;
      case 'payload/temperature':
        try {
          const { value, time } = JSON.parse(decodedMessage);
          temperatureStore.update({ value, time });
        } catch (error) {
          console.log(error);
        }
        break;
      // case 'pressure':
      //   try {
      //     const { value } = JSON.parse(decodedMessage);
      //     const time = new Date().toLocaleTimeString();
      //     pressureStore.update({ value, time });
      //     console.log(
      //       `type = ${chalk.bold.bgBlue('sub')}, topic = ${chalk.bold.bgGreen(
      //         topic
      //       )}, message = ${chalk.bold.bgRed(value)}`
      //     );
      //   } catch (error) {
      //     console.log('error');
      //   }
      //   break;
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
    subToTemp: () => {
      mqttClient.subscribe('temperature', (err) => {
        if (err) console.log(err);
      });
    },
    subToPressure: () => {
      mqttClient.subscribe('pressure', (err) => {
        if (err) console.log(err);
      });
    },
    pubTemperature: () => {
      const temperatureValue = (50 + Math.random() * 20).toFixed(2);
      const secs = new Date().getSeconds();
      const mins = new Date().getMinutes();
      mqttClient.publish(
        'temperature',
        JSON.stringify({
          value: temperatureValue,
          time: `${mins}:${secs}`
        })
      );
    },
    sendOrbitPosition: () => {
      const time = new Date().toLocaleString();
      const data = Math.random() * 200;
      mqttClient.publish('orbit', JSON.stringify({ time, data }));
      console.log(
        `type = ${chalk.bold.bgRed('pub')}, topic = ${chalk.bold.bgGreen(
          'orbit'
        )}, message = ${chalk.bold.bgBlue(`time = ${time}s, data = ${data} `)}`
      );
    }
  };
};

const mqttHandler = createMqttHandler();
export default mqttHandler;
