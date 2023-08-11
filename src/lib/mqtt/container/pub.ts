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

const humidity = (mqttClient: MqttClient) => {
  const humidityValue = (100 + Math.random() * 10).toFixed(2);
  const secs = new Date().getSeconds();
  const mins = new Date().getMinutes();

  try {
    mqttClient.publish(
      'container/humidity',
      JSON.stringify({
        value: humidityValue,
        time: `${mins}:${secs}`
      })
    );
  } catch (error) {
    console.log(error);
  }
};

const pressure = (mqttClient: MqttClient) => {
  const pressureValue = (100 + Math.random() * 10).toFixed(2);
  const secs = new Date().getSeconds();
  const mins = new Date().getMinutes();

  try {
    mqttClient.publish(
      'container/pressure',
      JSON.stringify({
        value: pressureValue,
        time: `${mins}:${secs}`
      })
    );
  } catch (error) {
    console.log(error);
  }
};

const altitude = (mqttClient: MqttClient) => {
  const pressureValue = (100 + Math.random() * 10).toFixed(2);
  const secs = new Date().getSeconds();
  const mins = new Date().getMinutes();

  try {
    mqttClient.publish(
      'container/altitude',
      JSON.stringify({
        value: pressureValue,
        time: `${mins}:${secs}`
      })
    );
  } catch (error) {
    console.log(error);
  }
};

const acceleration = (mqttClient: MqttClient) => {
  const x = (100 + Math.random() * 10).toFixed(2);
  const y = (100 + Math.random() * 10).toFixed(2);
  const z = (100 + Math.random() * 10).toFixed(2);
  const secs = new Date().getSeconds();
  const mins = new Date().getMinutes();

  try {
    mqttClient.publish(
      'container/acceleration',
      JSON.stringify({
        value: { x, y, z },
        time: `${mins}:${secs}`
      })
    );
  } catch (error) {
    console.log(error);
  }
};
const gyroscope = (mqttClient: MqttClient) => {
  const x = (100 + Math.random() * 10).toFixed(2);
  const y = (100 + Math.random() * 10).toFixed(2);
  const z = (100 + Math.random() * 10).toFixed(2);
  const secs = new Date().getSeconds();
  const mins = new Date().getMinutes();

  try {
    mqttClient.publish(
      'container/gyroscope',
      JSON.stringify({
        value: { x, y, z },
        time: `${mins}:${secs}`
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const publish = (mqttClient: MqttClient) => ({
  temperature: () => temperature(mqttClient),
  humidity: () => humidity(mqttClient),
  altitude: () => altitude(mqttClient),
  pressure: () => pressure(mqttClient),
  acceleration: () => acceleration(mqttClient),
  gyroscope: () => gyroscope(mqttClient)
});
