import altitudeStore from '@/stores/payload/altitude';
import type { Topics } from '../types';
import airPressureStore from '@/stores/payload/air-pressure';
import batteryVoltageStore from '@/stores/payload/battery-voltage';
import tiltAngleStore from '@/stores/payload/tilt-angle';
import airSpeedStore from '@/stores/payload/air-speed';
import commandEchoStore from '@/stores/payload/command-echo';
import gpsCoordinatesStore from '@/stores/payload/gps-coordinates';
import longitudeStore from '@/stores/payload/longitude';
import satellitesTrackedStore from '@/stores/payload/satellites-tracked';
import temperatureStore from '@/stores/payload/temperature';
import gyroscopeStore from '@/stores/payload/gyroscope';

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

const altitude = ({ message }: ITempMessage) => {
  try {
    const { value } = JSON.parse(message);
    altitudeStore.update({ value, time: getCurrentTime() });
  } catch (error) {
    console.log(error);
  }
};
const airPressure = ({ message }: ITempMessage) => {
  try {
    const { value } = JSON.parse(message);
    airPressureStore.update({ value, time: getCurrentTime() });
  } catch (error) {
    console.log(error);
  }
};
const batteryVoltage = ({ message }: ITempMessage) => {
  try {
    const { value } = JSON.parse(message);
    batteryVoltageStore.update({ value, time: getCurrentTime() });
  } catch (error) {
    console.log(error);
  }
};
const tiltAngle = ({ message }: ITempMessage) => {
  try {
    const { value } = JSON.parse(message);
    tiltAngleStore.update({ value, time: getCurrentTime() });
  } catch (error) {
    console.log(error);
  }
};
const airSpeed = ({ message }: ITempMessage) => {
  try {
    const { value } = JSON.parse(message);
    airSpeedStore.update({ value, time: getCurrentTime() });
  } catch (error) {
    console.log(error);
  }
};
const commandEcho = ({ message }: ITempMessage) => {
  try {
    const { value } = JSON.parse(message);
    commandEchoStore.update({ value, time: getCurrentTime() });
  } catch (error) {
    console.log(error);
  }
};
const gpsCoordinates = ({ message }: ITempMessage) => {
  try {
    const { value } = JSON.parse(message);
    gpsCoordinatesStore.update({ value, time: getCurrentTime() });
  } catch (error) {
    console.log(error);
  }
};
const longitude = ({ message }: ITempMessage) => {
  try {
    const { value } = JSON.parse(message);
    longitudeStore.update({ value, time: getCurrentTime() });
  } catch (error) {
    console.log(error);
  }
};
const satellitesTracked = ({ message }: ITempMessage) => {
  try {
    const { value } = JSON.parse(message);
    satellitesTrackedStore.update({ value, time: getCurrentTime() });
  } catch (error) {
    console.log(error);
  }
};

const temperature = ({ message }: ITempMessage) => {
  try {
    const { value } = JSON.parse(message);

    temperatureStore.update({ value, time: getCurrentTime() });
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
  airPressure: (props: ITempMessage) => airPressure(props),
  batteryVoltage: (props: ITempMessage) => batteryVoltage(props),
  tiltAngle: (props: ITempMessage) => tiltAngle(props),
  airSpeed: (props: ITempMessage) => airSpeed(props),
  commandEcho: (props: ITempMessage) => commandEcho(props),
  gpsCoordinates: (props: ITempMessage) => gpsCoordinates(props),
  longitude: (props: ITempMessage) => longitude(props),
  satellitesTracked: (props: ITempMessage) => satellitesTracked(props),

  altitude: (props: ITempMessage) => altitude(props),
  gyroscope: (props: ITempMessage) => gyroscope(props)
};
