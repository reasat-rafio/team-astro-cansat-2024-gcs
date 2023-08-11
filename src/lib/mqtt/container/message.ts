import type { Topics } from '../types';
import temperatureStore from '@stores/container/temperature';

interface ITempMessage {
  message: string;
  topic: Topics;
}
const temperature = ({ message }: ITempMessage) => {
  try {
    const { value, time } = JSON.parse(message);
    temperatureStore.update({ value, time });
  } catch (error) {
    console.log(error);
  }
};

export const message = {
  temperature: (props: ITempMessage) => temperature(props)
};
