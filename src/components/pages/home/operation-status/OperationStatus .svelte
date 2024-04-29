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
    simulationMode,
    groundMode,
    flightReadyMode,
    launchMode,
    ascentMode,
    cansatDeploymentMode,
    arrowBreakingDecentMode,
    landingMode,
    recoveryMode,
  } = $systemStepsStore);

  let tree: Tree[] = [
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
            state: flightReadyMode?.telemetryStarted,
          },
        },
      ],
    },

    {
      label: {
        text: 'Launch Mode',
        state: determineParentState([
          launchMode?.sensorCalibration,
          launchMode?.setMissionTime,
          launchMode?.launch,
        ]),
      },
      children: [
        {
          label: {
            text: 'Sensor Calibration',
            state: launchMode?.sensorCalibration,
          },
        },
        {
          label: {
            text: 'Set Mission Time',
            state: launchMode?.setMissionTime,
          },
        },
        {
          label: {
            text: 'Launch',
            state: launchMode?.launch,
          },
        },
      ],
    },

    {
      label: {
        text: 'Ascent Mode',
        state: determineParentState([ascentMode?.ejectionDelay]),
      },
      children: [
        {
          label: {
            text: 'Ejection delay',
            state: ascentMode?.ejectionDelay,
          },
        },
      ],
    },

    {
      label: {
        text: 'Cansat Deployment Mode',
        state: determineParentState([
          cansatDeploymentMode?.heatShieldDeployed,
          cansatDeploymentMode?.tiltCorrection,
        ]),
      },
      children: [
        {
          label: {
            text: 'Tilt Correction',
            state: cansatDeploymentMode?.tiltCorrection,
          },
        },
        {
          label: {
            text: 'Heat Shield Deployment',
            state: cansatDeploymentMode?.heatShieldDeployed,
          },
        },
      ],
    },

    {
      label: {
        text: 'Arrow Breaking Decent Mode',
        state: determineParentState([
          arrowBreakingDecentMode?.heatShieldReleasePreparation,
          arrowBreakingDecentMode?.heatShieldReleased,
        ]),
      },
      children: [
        {
          label: {
            text: 'Heat Shield Release Preparation',
            state: arrowBreakingDecentMode?.heatShieldReleasePreparation,
          },
        },
        {
          label: {
            text: 'Heat Shield Release',
            state: arrowBreakingDecentMode?.heatShieldReleased,
          },
        },
      ],
    },
    {
      label: {
        text: 'Landing Mode',
        state: determineParentState([
          landingMode?.bonusCameraStarted,
          landingMode?.landed,
          landingMode?.parachuteDeployment,
          landingMode?.recoveryPreparation,
        ]),
      },
      children: [
        {
          label: {
            text: 'Parachute Deployment',
            state: landingMode?.parachuteDeployment,
          },
        },
        {
          label: {
            text: 'Bonus Camera Started',
            state: landingMode?.bonusCameraStarted,
          },
        },
        {
          label: {
            text: 'Recovery Preparation',
            state: landingMode?.recoveryPreparation,
          },
        },
        {
          label: {
            text: 'Landed',
            state: landingMode?.landed,
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
          recoveryMode?.audioBuzzerPinning,
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
            state: recoveryMode?.audioBuzzerPinning,
          },
        },
        { label: { text: 'Device Found', state: recoveryMode?.deviceFound } },
        { label: { text: 'Telemetry Off', state: recoveryMode?.telemetryOff } },
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
