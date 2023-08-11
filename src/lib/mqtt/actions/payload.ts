import temperatureStore from '@stores/payload/temperature';
import type { MqttClient } from 'mqtt';
import type { Topics } from '../types';

interface ITempMessage {
  message: string;
  topic: Topics;
}

// payload/temperature
const onTempMessage = ({ message }: ITempMessage) => {
  try {
    const { value, time } = JSON.parse(message);
    temperatureStore.update({ value, time });
  } catch (error) {
    console.log(error);
  }
};

const pubTemp = (mqttClient: MqttClient) => {
  const temperatureValue = (50 + Math.random() * 20).toFixed(2);
  const secs = new Date().getSeconds();
  const mins = new Date().getMinutes();

  try {
    mqttClient.publish(
      'container/temperature',
      JSON.stringify({
        value: temperatureValue,
        time: `${mins}:${secs}`
      })
    );
  } catch (error) {
    console.log(error);
  }
};

const Payload = { onTempMessage, pubTemp };

export default Payload;
