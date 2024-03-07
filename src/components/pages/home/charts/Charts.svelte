<script lang="ts">
  import VisualIcon from '@/components/icons/VisualIcon.svelte';
  import Header from '../Header.svelte';
  import Altitude from '@/components/charts/Altitude.svelte';
  import AirPressure from '@/components/charts/AirPressure.svelte';
  import Temperature from '@/components/charts/Temperature.svelte';
  import AirSpeed from '@/components/charts/Temperature.svelte';
  import BatteryVoltage from '@/components/charts/BatteryVoltage.svelte';
  import GpsCoordinates from '@/components/charts/GpsCoordinates.svelte';
  import TiltAngle from '@/components/charts/TiltAngle.svelte';

  let headerEl: HTMLDivElement;
  let innerWidth = 0;
  let innerHeight = 0;
  let headerHeight = 0;

  $: if (innerWidth && innerHeight && headerEl) {
    headerHeight = headerEl.offsetHeight;
  }
</script>

<svelte:window bind:innerWidth bind:innerHeight />
<section class="flex h-full p-4">
  <div class="w-full overflow-auto">
    <div bind:this={headerEl}>
      <Header icon={VisualIcon} title="Charts" />
    </div>
    <div
      style="height: calc(100% - {headerHeight}px);"
      class="flex w-full overflow-auto scrollbar-thin">
      <Altitude />
      <AirPressure />
      <Temperature />
      <AirSpeed />
      <BatteryVoltage />
      <GpsCoordinates />
      <TiltAngle />
    </div>
  </div>
</section>
