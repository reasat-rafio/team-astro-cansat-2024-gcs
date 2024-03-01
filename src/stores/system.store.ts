import type { SensorData, SystemSteps } from '@/lib/@types/app.types';
import { writable } from 'svelte/store';

interface SystemStore {
  activeMode: string;
  teamId: string;
  steps: SystemSteps;
  sensorData: SensorData;
}

function createSystemStore() {
  const { subscribe, update } = writable<SystemStore>({
    activeMode: 'idle',
    teamId: '',
    steps: {
      calibrateTelemetry: 'notStarted',
      importCSV: 'notStarted',
      currentTimeSetFromGPS: 'notStarted',
      simulationActivate: 'notStarted',
      simulationEnable: 'notStarted',
      telemetryStarted: 'notStarted',
      flightEnable: 'notStarted',
    },
    sensorData: {
      packetCount: '0',
      hSDeployed: false,
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
    },
  });

  return {
    subscribe,
  };
}

const systemStore = createSystemStore();
export default systemStore;
