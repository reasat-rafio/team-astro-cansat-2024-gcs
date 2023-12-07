<script lang="ts">
  import LabIcon from '@/components/icons/LabIcon.svelte';
  import Header from '../Header.svelte';
  import TreeView from './ThreeView.svelte';

  type Tree = {
    label: string;
    children?: Tree[];
  };

  const tree: Tree[] = [
    {
      label: 'Ground Mode',
      children: [
        { label: 'Power On, Idle' },
        { label: 'Debugging System Started' },
        { label: 'Communication Module On' }
      ]
    },
    {
      label: 'Flight Ready Mode',
      children: [{ label: 'Activate Sensors and system Calibration start' }]
    },
    {
      label: 'Data Transmission',
      children: [{ label: 'Telemetry' }]
    },
    {
      label: 'Simulation Mode',
      children: [
        { label: 'Getting Pressure Data From CSV' },
        { label: 'Calculating Altitude And Speed' }
      ]
    },
    {
      label: 'On Air Mode',
      children: [
        { label: 'Checking Altitude' },
        { label: 'Taking Sensor Data' },
        { label: 'Taking Camera 1 Stream' },
        { label: 'Save To SD Card' },
        { label: 'Transmit To GCS' }
      ]
    },
    {
      label: 'Deployment',
      children: [
        { label: 'Payload Deployment' },
        { label: 'Bonus Camera Started' },
        { label: 'Heat Shield Mechanism Running' }
      ]
    },
    {
      label: 'Recovery Mode',
      children: [
        { label: 'Recovery Mechanism Running' },
        { label: 'GPS Location Pinning' },
        { label: 'Device Found' }
      ]
    }
  ];
</script>

<section class="overflow-auto col-span-4 row-span-2">
  <Header icon={LabIcon} title="System Steps" />

  <ul class="m-0 select-none">
    {#each tree as t}
      <TreeView tree={t} />
    {/each}
  </ul>
</section>
