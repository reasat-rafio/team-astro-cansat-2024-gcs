import { publish } from './pub';
import type { MqttClient } from 'mqtt';
import { subscribe } from './sub';
import { message } from './message';

const container = (mqttClient: MqttClient) => {
  return {
    subscribe: subscribe(mqttClient),
    publish: publish(mqttClient),
    message: message
  };
};

export default container;
