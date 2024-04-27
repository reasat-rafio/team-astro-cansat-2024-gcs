<script lang="ts">
  import Header from '../Header.svelte';
  import TreeView from './ThreeView.svelte';
  import type { SystemStatus } from '@/lib/@types/app.types';
  import systemStepsStore from '@/stores/system.steps.store';
  import { FlaskConical } from 'lucide-svelte';
  import { ScrollArea } from '@/components/ui/scroll-area/index.js';
  import { determineParentState } from '@/lib/helper';

  type Tree = {
    label: { text: string; state: SystemStatus };
    children?: Tree[];
  };

  $: ({
    groundMode,
    flightReadyMode,
    dataTransmission,
    simulationMode,
    onAirMode,
    deployment,
    recoveryMode,
  } = $systemStepsStore);

  let tree: Tree[] = [
    {
      label: {
        text: 'Ground Mode',
        state: determineParentState([
          groundMode?.powerOnIdle,
          groundMode?.debuggingSystemStarted,
          groundMode?.communicationModuleOn,
        ]),
      },
      children: [
        { label: { text: 'Power On, Idle', state: groundMode?.powerOnIdle } },
        {
          label: {
            text: 'Debugging System Started',
            state: groundMode?.debuggingSystemStarted,
          },
        },
        {
          label: {
            text: 'Communication Module On',
            state: groundMode?.communicationModuleOn,
          },
        },
      ],
    },
    {
      label: {
        text: 'Flight Ready Mode',
        state: determineParentState([
          flightReadyMode?.activateSensorAndSystemCalibrationStart,
        ]),
      },
      children: [
        {
          label: {
            text: 'Activate Sensors and system Calibration start',
            state: flightReadyMode?.activateSensorAndSystemCalibrationStart,
          },
        },
      ],
    },

    {
      label: {
        text: 'Data Transmission',
        state: determineParentState([dataTransmission?.telemetry]),
      },
      children: [
        { label: { text: 'Telemetry', state: dataTransmission?.telemetry } },
      ],
    },
    {
      label: {
        text: 'Simulation Mode',
        state: determineParentState([
          simulationMode?.gettingPressureDataFromCSV,
          simulationMode?.calculatingAltitudeAndSpeed,
        ]),
      },
      children: [
        {
          label: {
            text: 'Getting Pressure Data From CSV',
            state: simulationMode?.gettingPressureDataFromCSV,
          },
        },
        {
          label: {
            text: 'Calculating Altitude And Speed',
            state: simulationMode?.calculatingAltitudeAndSpeed,
          },
        },
      ],
    },
    {
      label: {
        text: 'On Air Mode',
        state: determineParentState([
          onAirMode?.checkingAltitude,
          onAirMode?.takingCamera1Steam,
          onAirMode?.saveToSDCard,
          onAirMode?.transmitToGCS,
        ]),
      },
      children: [
        {
          label: {
            text: 'Checking Altitude',
            state: onAirMode?.checkingAltitude,
          },
        },
        {
          label: {
            text: 'Taking Sensor Data',
            state: onAirMode?.takingCamera1Steam,
          },
        },
        {
          label: {
            text: 'Taking Camera 1 Stream',
            state: onAirMode?.takingCamera1Steam,
          },
        },
        { label: { text: 'Save To SD Card', state: onAirMode?.saveToSDCard } },
        { label: { text: 'Transmit To GCS', state: onAirMode?.transmitToGCS } },
      ],
    },
    {
      label: {
        text: 'Deployment',
        state: determineParentState([
          deployment?.payloadDeployed,
          deployment?.bonusCameraStarted,
          deployment?.heatShieldMechanismRunning,
        ]),
      },
      children: [
        {
          label: {
            text: 'Payload Deployment',
            state: deployment?.payloadDeployed,
          },
        },
        {
          label: {
            text: 'Bonus Camera Started',
            state: deployment?.bonusCameraStarted,
          },
        },
        {
          label: {
            text: 'Heat Shield Mechanism Running',
            state: deployment?.heatShieldMechanismRunning,
          },
        },
      ],
    },
    {
      label: {
        text: 'Recovery Mode',
        state: determineParentState([
          recoveryMode?.recoveryMechanismRunning,
          recoveryMode?.GPSLocationPinning,
          recoveryMode?.deviceFound,
        ]),
      },
      children: [
        {
          label: {
            text: 'Recovery Mechanism Running',
            state: recoveryMode?.recoveryMechanismRunning,
          },
        },
        {
          label: {
            text: 'GPS Location Pinning',
            state: recoveryMode?.GPSLocationPinning,
          },
        },
        { label: { text: 'Device Found', state: recoveryMode?.deviceFound } },
      ],
    },
  ];
</script>

<ScrollArea class="h-full w-full p-4">
  <Header icon={FlaskConical} title="System Steps" />

  <ul class="mt-5 select-none">
    {#each tree as t}
      <TreeView tree={t} />
    {/each}
  </ul>
</ScrollArea>
