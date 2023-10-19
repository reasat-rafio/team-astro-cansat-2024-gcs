import type { Topics } from '../types';
import temperatureStore from '@stores/payload/temperature';
import altitudeStore from '@stores/payload/altitude';
import accelerationStore from '@stores/payload/acceleration';
import gyroscopeStore from '@stores/payload/gyroscope';
interface ITempMessage {
  message: string;
  topic: Topics;
}

const getCurrentTime = () => {
  const secs = new Date().getSeconds();
  const mins = new Date().getMinutes();
  const time = `${mins}:${secs}`;
  return time;
};

const temperature = ({ message }: ITempMessage) => {
  try {
    const { value } = JSON.parse(message);

    temperatureStore.update({ value, time: getCurrentTime() });
  } catch (error) {
    console.log(error);
  }
};

const altitude = ({ message }: ITempMessage) => {
  try {
    const { value } = JSON.parse(message);
    altitudeStore.update({ value, time: getCurrentTime() });
  } catch (error) {
    console.log(error);
  }
};

const acceleration = ({ message }: ITempMessage) => {
  try {
    const { value } = JSON.parse(message);
    accelerationStore.update({ value, time: getCurrentTime() });
  } catch (error) {
    console.log(error);
  }
};
const gyroscope = ({ message }: ITempMessage) => {
  try {
    const { value } = JSON.parse(message);
    gyroscopeStore.update({ value, time: getCurrentTime() });
  } catch (error) {
    console.log(error);
  }
};

export const message = {
  temperature: (props: ITempMessage) => temperature(props),
  altitude: (props: ITempMessage) => altitude(props),
  acceleration: (props: ITempMessage) => acceleration(props),
  gyroscope: (props: ITempMessage) => gyroscope(props)
};
