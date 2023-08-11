import temperatureStore from '@stores/temperature';
import type { MqttClient } from 'mqtt';

interface ITempMessage {
  message: string;
}

// container/temperature
export const onTempMessage = ({ message }: ITempMessage) => {
  try {
    const { value, time } = JSON.parse(message);
    temperatureStore.update({ value, time });
  } catch (error) {
    console.log(error);
  }
};

export const pubTemp = (mqttClient: MqttClient) => {
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
};
