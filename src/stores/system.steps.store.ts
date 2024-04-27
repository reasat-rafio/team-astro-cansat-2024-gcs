import type { SystemStatus, SystemSteps } from '@/lib/@types/app.types';
import { writable } from 'svelte/store';

function createSystemSteps() {
  const { subscribe, update } = writable<SystemSteps>({
    groundMode: {
      powerOnIdle: 'notStarted',
      debuggingSystemStarted: 'notStarted',
      communicationModuleOn: 'notStarted',
    },
    flightReadyMode: {
      activateSensorAndSystemCalibrationStart: 'notStarted',
    },
    dataTransmission: {
      telemetry: 'notStarted',
    },
    simulationMode: {
      gettingPressureDataFromCSV: 'notStarted',
      calculatingAltitudeAndSpeed: 'notStarted',
    },
    onAirMode: {
      checkingAltitude: 'notStarted',
      takingSensorData: 'notStarted',
      takingCamera1Steam: 'notStarted',
      saveToSDCard: 'notStarted',
      transmitToGCS: 'notStarted',
    },
    deployment: {
      payloadDeployed: 'notStarted',
      bonusCameraStarted: 'notStarted',
      heatShieldMechanismRunning: 'notStarted',
    },
    recoveryMode: {
      recoveryMechanismRunning: 'notStarted',
      GPSLocationPinning: 'notStarted',
      deviceFound: 'notStarted',
    },

    // New steps
    calibrateTelemetry: 'notStarted',
    importCSV: 'notStarted',
    currentTimeSetFromGPS: 'notStarted',
    simulationActivate: 'notStarted',
    simulationEnable: 'notStarted',
    telemetryStarted: 'notStarted',
    flightEnable: 'notStarted',
  });

  function setImportCsvStatus(importCSV: SystemStatus) {
    update(($store) => ({ ...$store, importCSV }));
  }

  return {
    subscribe,
    setImportCsvStatus,
  };
}

const systemStepsStore = createSystemSteps();
export default systemStepsStore;
