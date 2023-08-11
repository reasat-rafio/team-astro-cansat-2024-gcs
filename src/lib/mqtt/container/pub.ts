import type { MqttClient } from 'mqtt';

const temperature = (mqttClient: MqttClient) => {
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

export const publish = (mqttClient: MqttClient) => ({
  temperature: () => temperature(mqttClient)
});
