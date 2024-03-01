import type {
  SensorData,
  StringArrayData,
  XYZStringArrayData,
} from '@/lib/@types/app.types';
import { writable } from 'svelte/store';

function createSensorDataStore() {
  const { subscribe, update } = writable<SensorData>({
    packetCount: '0',
    hsDeployed: false,
    pcDeployed: false,
    acceleration: { values: [], time: [] },
    airPressure: { values: [], time: [] },
    airSpeed: { values: [], time: [] },
    altitude: { values: [], time: [] },
    temperature: { values: [], time: [] },
    batteryVoltage: { values: [], time: [] },
    gpsCoordinates: { values: [], time: [] },
    gyroscope: { values: [], time: [] },
    longitude: { values: [], time: [] },
    satellitesTracked: { values: [], time: [] },
    tiltAngle: { values: [], time: [] },
    gpsTime: [],
    missionTime: [],
  });

  function updatePacketCount(packetCount: string) {
    update(($store) => ({ ...$store, packetCount }));
  }

  function updateHs(hsDeployed: boolean) {
    update(($store) => ({ ...$store, hsDeployed }));
  }

  function updatePc(pcDeployed: boolean) {
    update(($store) => ({ ...$store, pcDeployed }));
  }

  function updateAcceleration({ time, values }: XYZStringArrayData) {
    update(($store) => ({ ...$store, acceleration: { values, time } }));
  }

  function updateAirPressure({ time, values }: StringArrayData) {
    update(($store) => ({ ...$store, airPressure: { values, time } }));
  }

  function updateAirSpeed({ time, values }: StringArrayData) {
    update(($store) => ({ ...$store, airSpeed: { values, time } }));
  }

  function updateAltitude({ time, values }: StringArrayData) {
    update(($store) => ({ ...$store, altitude: { values, time } }));
  }

  function updateTemperature({ time, values }: StringArrayData) {
    update(($store) => ({ ...$store, temperature: { values, time } }));
  }

  function updateBatteryVoltage({ time, values }: StringArrayData) {
    update(($store) => ({ ...$store, batteryVoltage: { values, time } }));
  }

  function updateGpsCoordinates({ time, values }: XYZStringArrayData) {
    update(($store) => ({ ...$store, gpsCoordinates: { values, time } }));
  }

  function updateGpsTime(time: string) {
    update(($store) => ({ ...$store, gpsTime: [...$store.gpsTime, time] }));
  }

  function updateGyroscope({ time, values }: XYZStringArrayData) {
    update(($store) => ({ ...$store, gyroscope: { values, time } }));
  }

  function updateLongitude({ time, values }: StringArrayData) {
    update(($store) => ({ ...$store, longitude: { values, time } }));
  }

  function updateSatellitesTracked({ time, values }: StringArrayData) {
    update(($store) => ({ ...$store, satellitesTracked: { values, time } }));
  }

  function updateTiltAngle({ time, values }: XYZStringArrayData) {
    update(($store) => ({ ...$store, tiltAngle: { values, time } }));
  }

  function updateMissionTime(time: string) {
    update(($store) => ({
      ...$store,
      missionTime: [...$store.missionTime, time],
    }));
  }

  return {
    subscribe,
    updatePacketCount,
    updateHs,
    updatePc,
    updateAcceleration,
    updateAirPressure,
    updateAirSpeed,
    updateAltitude,
    updateTemperature,
    updateBatteryVoltage,
    updateGpsCoordinates,
    updateGpsTime,
    updateMissionTime,
    updateGyroscope,
    updateLongitude,
    updateSatellitesTracked,
    updateTiltAngle,
  };
}

const sensorDataStore = createSensorDataStore();
export default sensorDataStore;
