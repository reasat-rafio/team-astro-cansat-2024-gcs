<script lang="ts">
  import Header from '../Header.svelte';
  import TreeView from './ThreeView.svelte';
  import type { SystemStatus } from '@/lib/@types/app.types';
  import systemStepsStore from '@/stores/system.steps.store';
  import { FlaskConical } from 'lucide-svelte';
  import { ScrollArea } from '@/components/ui/scroll-area/index.js';

  type Tree = {
    label: { text: string; state: SystemStatus };
    children?: Tree[];
  };

  $: ({ importCSV } = $systemStepsStore);

  let tree: Tree[] = [
    {
      label: { text: 'Ground Mode', state: importCSV },
      children: [
        { label: { text: 'Power On, Idle', state: importCSV } },
        { label: { text: 'Debugging System Started', state: importCSV } },
        { label: { text: 'Communication Module On', state: importCSV } },
      ],
    },
    {
      label: { text: 'Flight Ready Mode', state: importCSV },
      children: [
        {
          label: {
            text: 'Activate Sensors and system Calibration start',
            state: importCSV,
          },
        },
      ],
    },

    {
      label: { text: 'Data Transmission', state: importCSV },
      children: [{ label: { text: 'Telemetry', state: importCSV } }],
    },
    {
      label: { text: 'Simulation Mode', state: importCSV },
      children: [
        { label: { text: 'Getting Pressure Data From CSV', state: importCSV } },
        { label: { text: 'Calculating Altitude And Speed', state: importCSV } },
      ],
    },
    {
      label: { text: 'On Air Mode', state: importCSV },
      children: [
        { label: { text: 'Checking Altitude', state: importCSV } },
        { label: { text: 'Taking Sensor Data', state: importCSV } },
        { label: { text: 'Taking Camera 1 Stream', state: importCSV } },
        { label: { text: 'Save To SD Card', state: importCSV } },
        { label: { text: 'Transmit To GCS', state: importCSV } },
      ],
    },
    {
      label: { text: 'Deployment', state: importCSV },
      children: [
        { label: { text: 'Payload Deployment', state: importCSV } },
        { label: { text: 'Bonus Camera Started', state: importCSV } },
        { label: { text: 'Heat Shield Mechanism Running', state: importCSV } },
      ],
    },
    {
      label: { text: 'Recovery Mode', state: importCSV },
      children: [
        { label: { text: 'Recovery Mechanism Running', state: importCSV } },
        { label: { text: 'GPS Location Pinning', state: importCSV } },
        { label: { text: 'Device Found', state: importCSV } },
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
