import type { StringData, XYZStringData } from '@/lib/@types/app.types';
import { writable } from 'svelte/store';

export type SensorDataStore = {
  currentVal: StringData | null;
  history: { time: string[]; value: string[] };
};

function createAltitudeStore() {
  const { subscribe, update } = writable<SensorDataStore>({
    currentVal: null,
    history: {
      time: [],
      value: [],
    },
  });

  function updateAltitude(val: StringData) {
    update(($store) => ({
      ...$store,
      currentVal: val,
      history: {
        time: [...$store.history.time, val.time],
        value: [...$store.history.value, val.value],
      },
    }));
  }

  return {
    subscribe,
    updateAltitude,
  };
}

export const altitudeStore = createAltitudeStore();

function createAirPressureStore() {
  const { subscribe, update } = writable<SensorDataStore>({
    currentVal: null,
    history: {
      time: [],
      value: [],
    },
  });

  function updateAirPressure(val: StringData) {
    update(($store) => ({
      ...$store,
      currentVal: val,
      history: {
        time: [...$store.history.time, val.time],
        value: [...$store.history.value, val.value],
      },
    }));
  }

  return {
    subscribe,
    updateAirPressure,
  };
}
export const airPressureStore = createAirPressureStore();

function createTemperatureStore() {
  const { subscribe, update } = writable<SensorDataStore>({
    currentVal: null,
    history: {
      time: [],
      value: [],
    },
  });

  function updateTemperature(val: StringData) {
    update(($store) => ({
      ...$store,
      currentVal: val,
      history: {
        time: [...$store.history.time, val.time],
        value: [...$store.history.value, val.value],
      },
    }));
  }

  return {
    subscribe,
    updateTemperature,
  };
}

export const temperatureStore = createTemperatureStore();

function createAirSpeedStore() {
  const { subscribe, update } = writable<SensorDataStore>({
    currentVal: null,
    history: {
      time: [],
      value: [],
    },
  });

  function updateAirSpeed(val: StringData) {
    update(($store) => ({
      ...$store,
      currentVal: val,
      history: {
        time: [...$store.history.time, val.time],
        value: [...$store.history.value, val.value],
      },
    }));
  }

  return {
    subscribe,
    updateAirSpeed,
  };
}

export const airSpeedStore = createAirSpeedStore();

function createBatteryVoltageStore() {
  const { subscribe, update } = writable<SensorDataStore>({
    currentVal: null,
    history: {
      time: [],
      value: [],
    },
  });

  function updateBatteryVoltage(val: StringData) {
    update(($store) => ({
      ...$store,
      currentVal: val,
      history: {
        time: [...$store.history.time, val.time],
        value: [...$store.history.value, val.value],
      },
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
    history: {
      value: { x: string[]; y: string[]; z: string[] };
      time: string[];
    };
  }>({
    currentVal: null,
    history: {
      value: {
        x: [],
        y: [],
        z: [],
      },
      time: [],
    },
  });

  function updateGpsCoordinates(val: XYZStringData) {
    update(($store) => ({
      ...$store,
      currentVal: val,
      history: {
        time: [...$store.history.time, val.time],
        value: {
          x: [...$store.history.value.x, val.value.x],
          y: [...$store.history.value.y, val.value.y],
          z: [...$store.history.value.z, val.value.z],
        },
      },
    }));
  }

  return {
    subscribe,
    updateGpsCoordinates,
  };
}

export const gpsCoordinatesStore = createGpsCoordinatesStore();

export type SensorData2Store = {
  currentVal: XYZStringData | null;
  history: {
    value: { x: string[]; y: string[]; z: string[] };
    time: string[];
  };
};

function createGyroscopeStore() {
  const { subscribe, update } = writable<SensorData2Store>({
    currentVal: null,
    history: {
      value: {
        x: [],
        y: [],
        z: [],
      },
      time: [],
    },
  });

  function updateGyroscope(val: XYZStringData) {
    update(($store) => ({
      ...$store,
      currentVal: val,
      history: {
        time: [...$store.history.time, val.time],
        value: {
          x: [...$store.history.value.x, val.value.x],
          y: [...$store.history.value.y, val.value.y],
          z: [...$store.history.value.z, val.value.z],
        },
      },
    }));
  }

  return {
    subscribe,
    updateGyroscope,
  };
}

export const gyroscopeStore = createGyroscopeStore();

function createTiltAngleStore() {
  const { subscribe, update } = writable<SensorData2Store>({
    currentVal: null,
    history: {
      value: {
        x: [],
        y: [],
        z: [],
      },
      time: [],
    },
  });

  function updateTiltAngle(val: XYZStringData) {
    update(($store) => ({
      ...$store,
      currentVal: val,
      history: {
        time: [...$store.history.time, val.time],
        value: {
          x: [...$store.history.value.x, val.value.x],
          y: [...$store.history.value.y, val.value.y],
          z: [...$store.history.value.z, val.value.z],
        },
      },
    }));
  }

  return {
    subscribe,
    updateTiltAngle,
  };
}

export const tiltAngleStore = createTiltAngleStore();
