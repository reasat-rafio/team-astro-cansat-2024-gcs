<script lang="ts">
  import AirPressure from '@/components/charts/AirPressure.svelte';
  import AirSpeed from '@/components/charts/AirSpeed.svelte';
  import Altitude from '@/components/charts/Altitude.svelte';
  import BatteryVoltage from '@/components/charts/BatteryVoltage.svelte';
  import GpsCoordinates from '@/components/charts/GpsCoordinates.svelte';
  import Temperature from '@/components/charts/Temperature.svelte';
  import TiltAngle from '@/components/charts/TiltAngle.svelte';
  import { ScrollArea } from '@/components/ui/scroll-area/index.js';
  import { BarChart4 } from 'lucide-svelte';
  import Header from '../Header.svelte';

  let headerEl: HTMLDivElement;
  let innerWidth = 0;
  let innerHeight = 0;
  let headerHeight = 0;

  $: if (innerWidth && innerHeight && headerEl) {
    headerHeight = headerEl.offsetHeight;
  }
</script>

<svelte:window bind:innerWidth bind:innerHeight />
<ScrollArea orientation="both" class="flex h-full w-full p-4">
  <div bind:this={headerEl}>
    <Header icon={BarChart4} title="Charts" />
  </div>
  <div style="height: calc(100% - {headerHeight}px);" class="mt-5 flex w-full">
    <Altitude />
    <AirPressure />
    <Temperature />
    <AirSpeed />
    <BatteryVoltage />
    <GpsCoordinates />
    <TiltAngle />
  </div>
</ScrollArea>
