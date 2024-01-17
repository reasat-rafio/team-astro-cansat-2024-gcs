<script lang="ts">
  import LabIcon from '@/components/icons/LabIcon.svelte';
  import Header from '../Header.svelte';
  import TreeView from './ThreeView.svelte';
  import gcsStore from '@/stores/gcs.store';
  import type { Status } from '@/lib/@types/app.types';
  const { snapshot } = $gcsStore;

  type Tree = {
    label: { text: string; state: Status };
    children?: Tree[];
  };

  $: tree = [
    { label: { text: 'Import CSV', state: $snapshot.context.steps.importCSV } },
    // {
    //   label: {
    //     text: 'Telemetry Transmission',
    //     state: $snapshot.context.steps.telemetryStarted,
    //   },
    // },
    // {
    //   label: {
    //     text: 'Calibrate Telemetry',
    //     state: $snapshot.context.steps.calibrateTelemetry,
    //   },
    // },
    // {
    //   label: {
    //     text: 'Set Current Time From GPS Module',
    //     state: $snapshot.context.steps.currentTimeSetFromGPS,
    //   },
    // },
    {
      label: {
        text: 'Simulation Enable',
        state: $snapshot.context.steps.simulationEnable,
      },
    },
    {
      label: {
        text: 'Simulation Activate',
        state: $snapshot.context.steps.simulationActivate,
      },
    },
    {
      label: {
        text: 'Flight Mode Enable',
        state: $snapshot.context.steps.flightEnable,
      },
    },
  ] as Tree[];

  $: {
    console.log(tree);
  }
</script>

<section class="col-span-3 col-start-4 row-span-2 overflow-auto">
  <Header icon={LabIcon} title="System Steps" />

  <ul class="m-0 mx-2 select-none">
    {#each tree as t}
      <TreeView tree={t} />
    {/each}
  </ul>
</section>

<!-- {
    //   label: 'Ground Mode',
    //   children: [
    //     { label: 'Power On, Idle' },
    //     { label: 'Debugging System Started' },
    //     { label: 'Communication Module On' }
    //   ]
    // },
    // {
    //   label: 'Flight Ready Mode',
    //   children: [{ label: 'Activate Sensors and system Calibration start' }]
    // },
    // {
    //   label: 'Data Transmission',
    //   children: [{ label: 'Telemetry' }]
    // },
    // {
    //   label: 'Simulation Mode',
    //   children: [
    //     { label: 'Getting Pressure Data From CSV' },
    //     { label: 'Calculating Altitude And Speed' }
    //   ]
    // },
    // {
    //   label: 'On Air Mode',
    //   children: [
    //     { label: 'Checking Altitude' },
    //     { label: 'Taking Sensor Data' },
    //     { label: 'Taking Camera 1 Stream' },
    //     { label: 'Save To SD Card' },
    //     { label: 'Transmit To GCS' }
    //   ]
    // },
    // {
    //   label: 'Deployment',
    //   children: [
    //     { label: 'Payload Deployment' },
    //     { label: 'Bonus Camera Started' },
    //     { label: 'Heat Shield Mechanism Running' }
    //   ]
    // },
    // {
    //   label: 'Recovery Mode',
    //   children: [
    //     { label: 'Recovery Mechanism Running' },
    //     { label: 'GPS Location Pinning' },
    //     { label: 'Device Found' }
    //   ]
    // } -->
