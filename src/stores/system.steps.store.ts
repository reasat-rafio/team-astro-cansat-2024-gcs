import type { SystemStatus, SystemSteps } from '@/lib/@types/app.types';
import { writable } from 'svelte/store';

function createSystemSteps() {
  const { subscribe, update } = writable<SystemSteps>({
    calibrateTelemetry: 'notStarted',
    importCSV: 'notStarted',
    currentTimeSetFromGPS: 'notStarted',
    simulationActivate: 'notStarted',
    simulationEnable: 'notStarted',
    telemetryStarted: 'notStarted',
    flightEnable: 'notStarted',
  });

  function setCsvStatus(importCSV: SystemStatus) {
    update(($store) => ({ ...$store, importCSV }));
  }

  return {
    subscribe,
    setCsvStatus,
  };
}

const systemStepsStore = createSystemSteps();
export default systemStepsStore;
