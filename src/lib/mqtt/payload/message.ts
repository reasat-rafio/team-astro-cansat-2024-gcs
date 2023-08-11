import type { Topics } from '../types';
import humidityStore from '@stores/payload/humidity';
import temperatureStore from '@stores/payload/temperature';
import pressureStore from '@stores/payload/pressure';
import altitudeStore from '@stores/payload/altitude';
import accelerationStore from '@stores/payload/acceleration';
import gyroscopeStore from '@stores/payload/gyroscope';
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

const humidity = ({ message }: ITempMessage) => {
  try {
    const { value, time } = JSON.parse(message);
    humidityStore.update({ value, time });
  } catch (error) {
    console.log(error);
  }
};

const pressure = ({ message }: ITempMessage) => {
  try {
    const { value, time } = JSON.parse(message);
    pressureStore.update({ value, time });
  } catch (error) {
    console.log(error);
  }
};
const altitude = ({ message }: ITempMessage) => {
  try {
    const { value, time } = JSON.parse(message);
    altitudeStore.update({ value, time });
  } catch (error) {
    console.log(error);
  }
};

const acceleration = ({ message }: ITempMessage) => {
  try {
    const { value, time } = JSON.parse(message);
    accelerationStore.update({ value, time });
  } catch (error) {
    console.log(error);
  }
};
const gyroscope = ({ message }: ITempMessage) => {
  try {
    const { value, time } = JSON.parse(message);
    gyroscopeStore.update({ value, time });
  } catch (error) {
    console.log(error);
  }
};

export const message = {
  temperature: (props: ITempMessage) => temperature(props),
  humidity: (props: ITempMessage) => humidity(props),
  pressure: (props: ITempMessage) => pressure(props),
  altitude: (props: ITempMessage) => altitude(props),
  acceleration: (props: ITempMessage) => acceleration(props),
  gyroscope: (props: ITempMessage) => gyroscope(props)
};
