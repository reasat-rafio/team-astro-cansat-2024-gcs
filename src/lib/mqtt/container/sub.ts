import type { MqttClient } from 'mqtt';

const temperature = (mqttClient: MqttClient) => {
  mqttClient.subscribe('container/temperature', (err) => {
    if (err) console.log(err);
  });
};

const humidity = (mqttClient: MqttClient) => {
  mqttClient.subscribe('container/humidity', (err) => {
    if (err) console.log(err);
  });
};

const altitude = (mqttClient: MqttClient) => {
  mqttClient.subscribe('container/altitude', (err) => {
    if (err) console.log(err);
  });
};

const acceleration = (mqttClient: MqttClient) => {
  mqttClient.subscribe('container/acceleration', (err) => {
    if (err) console.log(err);
  });
};

const gyroscope = (mqttClient: MqttClient) => {
  mqttClient.subscribe('container/gyroscope', (err) => {
    if (err) console.log(err);
  });
};

const pressure = (mqttClient: MqttClient) => {
  mqttClient.subscribe('container/pressure', (err) => {
    if (err) console.log(err);
  });
};

const all = (mqttClient: MqttClient) => {
  temperature(mqttClient);
  humidity(mqttClient);
  altitude(mqttClient);
  acceleration(mqttClient);
  gyroscope(mqttClient);
  pressure(mqttClient);
};

export const subscribe = (mqttClient: MqttClient) => ({
  all: () => all(mqttClient),
  temperature: () => temperature(mqttClient),
  humidity: () => humidity(mqttClient),
  altitude: () => altitude(mqttClient),
  acceleration: () => acceleration(mqttClient),
  gyroscope: () => gyroscope(mqttClient),
  pressure: () => pressure(mqttClient)
});
