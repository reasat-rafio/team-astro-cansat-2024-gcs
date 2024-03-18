import type { StringData, XYZStringData } from '@/lib/@types/app.types';
import { writable } from 'svelte/store';

function createAltitudeStore() {
  const { subscribe, update } = writable<{
    currentVal: StringData | null;
    history: StringData[];
  }>({
    currentVal: null,
    history: [],
  });

  function updateAltitude(val: StringData) {
    update(($store) => ({
      ...$store,
      currentVal: val,
      history: [...$store.history, val],
    }));
  }

  return {
    subscribe,
    updateAltitude,
  };
}

export const altitudeStore = createAltitudeStore();

function createAirPressureStore() {
  const { subscribe, update } = writable<{
    currentVal: StringData | null;
    history: StringData[];
  }>({
    currentVal: null,
    history: [],
  });

  function updateAirPressure(val: StringData) {
    update(($store) => ({
      ...$store,
      currentVal: val,
      history: [...$store.history, val],
    }));
  }

  return {
    subscribe,
    updateAirPressure,
  };
}
export const airPressureStore = createAirPressureStore();

function createTemperatureStore() {
  const { subscribe, update } = writable<{
    currentVal: StringData | null;
    history: StringData[];
  }>({
    currentVal: null,
    history: [],
  });

  function updateTemperature(val: StringData) {
    update(($store) => ({
      ...$store,
      currentVal: val,
      history: [...$store.history, val],
    }));
  }

  return {
    subscribe,
    updateTemperature,
  };
}

export const temperatureStore = createTemperatureStore();

function createAirSpeedStore() {
  const { subscribe, update } = writable<{
    currentVal: StringData | null;
    history: StringData[];
  }>({
    currentVal: null,
    history: [],
  });

  function updateAirSpeed(val: StringData) {
    update(($store) => ({
      ...$store,
      currentVal: val,
      history: [...$store.history, val],
    }));
  }

  return {
    subscribe,
    updateAirSpeed,
  };
}

export const airSpeedStore = createAirSpeedStore();

function createBatteryVoltageStore() {
  const { subscribe, update } = writable<{
    currentVal: StringData | null;
    history: StringData[];
  }>({
    currentVal: null,
    history: [],
  });

  function updateBatteryVoltage(val: StringData) {
    update(($store) => ({
      ...$store,
      currentVal: val,
      history: [...$store.history, val],
    }));
  }

  return {
    subscribe,
    updateBatteryVoltage,
  };
}
export const batteryVoltageStore = createBatteryVoltageStore();

function createGpsCoordinatesStore() {
  const { subscribe, update } = writable<{
    currentVal: XYZStringData | null;
    history: XYZStringData[];
  }>({
    currentVal: null,
    history: [],
  });

  function updateGpsCoordinates(val: XYZStringData) {
    update(($store) => ({
      ...$store,
      currentVal: val,
      history: [...$store.history, val],
    }));
  }

  return {
    subscribe,
    updateGpsCoordinates,
  };
}

export const gpsCoordinatesStore = createGpsCoordinatesStore();

function createGyroscopeStore() {
  const { subscribe, update } = writable<{
    currentVal: XYZStringData | null;
    history: XYZStringData[];
  }>({
    currentVal: null,
    history: [],
  });

  function updateGyroscope(val: XYZStringData) {
    update(($store) => ({
      ...$store,
      currentVal: val,
      history: [...$store.history, val],
    }));
  }

  return {
    subscribe,
    updateGyroscope,
  };
}

export const gyroscopeStore = createGyroscopeStore();

function createTiltAngleStore() {
  const { subscribe, update } = writable<{
    currentVal: XYZStringData | null;
    history: XYZStringData[];
  }>({
    currentVal: null,
    history: [],
  });

  function updateTiltAngle(val: XYZStringData) {
    update(($store) => ({
      ...$store,
      currentVal: val,
      history: [...$store.history, val],
    }));
  }

  return {
    subscribe,
    updateTiltAngle,
  };
}

export const tiltAngleStore = createTiltAngleStore();
