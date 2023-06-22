import mqtt from 'mqtt';
import chalk from 'chalk';
import type { MqttClient } from 'mqtt';
import { temperature } from '@stores/data.store';

class MqttHandler {
  private mqttClient: MqttClient | null;

  constructor() {
    this.mqttClient = null;
    this.connect();

    setInterval(() => {
      this.pubTemperature();
    }, 5000);
  }

  connect() {
    this.mqttClient = this.mqttClient
      ? this.mqttClient
      : mqtt.connect('ws://localhost:8080');

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log(`ERROR: ${err}`);
      this.mqttClient?.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log(`mqtt client connected`);
    });

    // When a message arrives, do magic
    this.mqttClient.on('message', async (topic, message) => {
      let decodedMessage: string;
      const decoder = new TextDecoder('utf8');

      switch (topic) {
        case 'temperature':
          try {
            decodedMessage = decoder.decode(message);
            const { data }: { data: { temperature: string; time: string } } =
              JSON.parse(decodedMessage);

            temperature.update((t) => ({
              temperature: [...t.temperature, +data.temperature],
              time: [...t.time, data.time]
            }));

            console.log(
              `type = ${chalk.bold.bgBlue('sub')}, topic = ${chalk.bold.bgGreen(
                topic
              )}, message = ${chalk.bold.bgRed(decodedMessage)}`
            );
          } catch (error) {
            console.log(error);
          }
          break;
        case 'orbit':
          try {
            decodedMessage = decoder.decode(message);
            console.log(
              `type = ${chalk.bold.bgBlue('sub')}, topic = ${chalk.bold.bgGreen(
                topic
              )}, message = ${chalk.bold.bgRed(decodedMessage)}`
            );
          } catch (error) {
            console.log('error');
          }
          break;
        default:
          break;
      }
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

  subToTemp() {
    this.mqttClient?.subscribe('temperature', (err) => {
      if (err) console.log(err);
    });
  }

  subToOrbit() {
    this.mqttClient?.subscribe('orbit', (err) => {
      if (err) console.log(err);
    });
  }

  isConnected() {
    return this.mqttClient?.connected;
  }

  // publish temperature
  pubTemperature() {
    const temperature = (50 + Math.random() * 20).toFixed(2);
    const time = new Date().toLocaleTimeString();
    this.mqttClient?.publish(
      'temperature',
      JSON.stringify({
        name: 'temperature',
        data: { temperature, time }
      })
    );
  }

  // publish orbitPosition
  sendOrbitPosition() {
    const time = new Date().toLocaleString();
    const data = Math.random() * 200;
    this.mqttClient?.publish('orbit', JSON.stringify({ time, data }));
    console.log(
      `type = ${chalk.bold.bgRed('pub')}, topic = ${chalk.bold.bgGreen(
        'orbit'
      )}, message = ${chalk.bold.bgBlue(`time = ${time}s, data = ${data} `)}`
    );
  }
}

export default MqttHandler;
