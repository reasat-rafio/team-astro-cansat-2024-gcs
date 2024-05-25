import type { SystemStatus, SystemSteps } from '@/lib/@types/app.types';
import { writable } from 'svelte/store';

function createSystemSteps() {
  const { subscribe, update } = writable<SystemSteps>({
    simulationMode: {
      simulationEnable: 'notStarted',
      simulationActivate: 'notStarted',
      gettingPressureDataFromCSV: 'notStarted',
      calculatingAltitudeAndSpeed: 'notStarted',
    },

    groundMode: {
      powerOnIdle: 'notStarted',
      debuggingSystemStarted: 'notStarted',
      communicationModuleOn: 'notStarted',
    },
    flightReadyMode: {
      activateSensorAndSystemCalibrationStart: 'notStarted',
      telemetryStarted: 'notStarted',
    },
    launchMode: {
      sensorCalibration: 'notStarted',
      setMissionTime: 'notStarted',
      launch: 'notStarted',
    },
    ascentMode: {
      ejectionDelay: 'notStarted',
    },
    cansatDeploymentMode: {
      tiltCorrection: 'notStarted',
      heatShieldDeployed: 'notStarted',
    },

    arrowBreakingDecentMode: {
      heatShieldReleasePreparation: 'notStarted',
      heatShieldReleased: 'notStarted',
    },
    landingMode: {
      parachuteDeployment: 'notStarted',
      bonusCameraStarted: 'notStarted',
      recoveryPreparation: 'notStarted',
      landed: 'notStarted',
    },

    recoveryMode: {
      recoveryMechanismRunning: 'notStarted',
      GPSLocationPinning: 'notStarted',
      audioBuzzerPinning: 'notStarted',
      deviceFound: 'notStarted',
      telemetryOff: 'notStarted',
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

  function setSimulationEnable(simulationEnable: SystemStatus) {
    update(($store) => ({
      ...$store,
      simulationMode: { ...$store.simulationMode, simulationEnable },
    }));
  }

  function setSimulationActivate(simulationActivate: SystemStatus) {
    update(($store) => ({
      ...$store,
      simulationMode: { ...$store.simulationMode, simulationActivate },
    }));
  }
   function setImportCsvStatus(importCSV: SystemStatus) {
     update(($store) => ({ ...$store, importCSV }));
   }

  return {
    subscribe,
    setImportCsvStatus,
    setSimulationEnable,
    setSimulationActivate,
  };
}

const systemStepsStore = createSystemSteps();
export default systemStepsStore;
