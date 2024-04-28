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
        {
          label: {
            text: 'Telemetry Started',
            state: dataTransmission?.telemetry,
          },
        },
      ],
    },

    // {
    //   label: {
    //     text: 'Simulation Mode',
    //     state: determineParentState([
    //       simulationMode?.gettingPressureDataFromCSV,
    //       simulationMode?.calculatingAltitudeAndSpeed,
    //     ]),
    //   },
    //   children: [
    //     {
    //       label: {
    //         text: 'Getting Pressure Data From CSV',
    //         state: simulationMode?.gettingPressureDataFromCSV,
    //       },
    //     },
    //     {
    //       label: {
    //         text: 'Calculating Altitude And Speed',
    //         state: simulationMode?.calculatingAltitudeAndSpeed,
    //       },
    //     },
    //   ],
    // },

    {
      label: {
        text: 'Launch Mode',
        state: 'error',
      },
      children: [
        {
          label: {
            text: 'Sensor Calibration',
            state: 'notStarted',
          },
        },
        {
          label: {
            text: 'Set Mission Time',
            state: 'notStarted',
          },
        },
        {
          label: {
            text: 'Launch',
            state: 'notStarted',
          },
        },
      ],
    },

    {
      label: {
        text: 'Ascent Mode',
        state: 'error',
      },
      children: [
        {
          label: {
            text: 'Ejection delay',
            state: 'notStarted',
          },
        },
      ],
    },

    {
      label: {
        text: 'Cansat Deployment Mode',
        state: determineParentState([
          deployment?.payloadDeployed,
          deployment?.bonusCameraStarted,
          deployment?.heatShieldMechanismRunning,
        ]),
      },
      children: [
        {
          label: {
            text: 'Tilt Currection',
            state: deployment?.payloadDeployed,
          },
        },
        {
          label: {
            text: 'Heat Shield Deployment',
            state: deployment?.payloadDeployed,
          },
        },
      ],
    },

    {
      label: {
        text: 'Arrow Breaking Decent Mode',
        state: determineParentState([
          deployment?.payloadDeployed,
          deployment?.bonusCameraStarted,
          deployment?.heatShieldMechanismRunning,
        ]),
      },
      children: [
        {
          label: {
            text: 'Heat Shield Release Preparation',
            state: deployment?.payloadDeployed,
          },
        },
        {
          label: {
            text: 'Heat Shield Release',
            state: deployment?.payloadDeployed,
          },
        },
      ],
    },
    {
      label: {
        text: 'Landing Mode',
        state: determineParentState([
          deployment?.payloadDeployed,
          deployment?.bonusCameraStarted,
          deployment?.heatShieldMechanismRunning,
        ]),
      },
      children: [
        {
          label: {
            text: 'Parachute Deployment',
            state: deployment?.payloadDeployed,
          },
          children: [
            {
              label: {
                text: 'Parachute Deployment',
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
                text: 'Recovery Preparation',
                state: deployment?.payloadDeployed,
              },
            },
            {
              label: {
                text: 'Landed',
                state: deployment?.payloadDeployed,
              },
            },
          ],
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
            text: 'Recovery Mechanisms Running',
            state: recoveryMode?.recoveryMechanismRunning,
          },
        },
        {
          label: {
            text: 'GPS Location Pinning',
            state: recoveryMode?.GPSLocationPinning,
          },
        },
        {
          label: {
            text: 'Audio Buzzer Ringing',
            state: recoveryMode?.GPSLocationPinning,
          },
        },
        { label: { text: 'Device Found', state: recoveryMode?.deviceFound } },
        { label: { text: 'Telemetry Off', state: recoveryMode?.deviceFound } },
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
