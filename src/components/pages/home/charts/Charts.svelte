<script lang="ts">
  import VisualIcon from '@/components/icons/VisualIcon.svelte';
  import Header from '../Header.svelte';
  import Altitude from '@/components/charts/Altitude.svelte';

  // import Altitude from '../../visualization/charts/Altitude.svelte';
  // import AirPressure from '../../visualization/charts/AirPressure.svelte';
  // import Temperature from '../../visualization/charts/Temperature.svelte';
  // import AirSpeed from '../../visualization/charts/AirSpeed.svelte';
  // import BatteryVoltage from '../../visualization/charts/BatteryVoltage.svelte';
  // import GpsCoordinates from '../../visualization/charts/GpsCoordinates.svelte';
  // import TiltAngle from '../../visualization/charts/TiltAngle.svelte';

  let headerEl: HTMLDivElement;
  let innerWidth = 0;
  let innerHeight = 0;
  let headerHeight = 0;

  $: if (innerWidth && innerHeight && headerEl) {
    headerHeight = headerEl.offsetHeight;
  }
</script>

<svelte:window bind:innerWidth bind:innerHeight />
<section class="w-full overflow-auto scrollbar-thin">
  <div bind:this={headerEl}>
    <Header icon={VisualIcon} title="Charts" />
  </div>
  <div
    style="height: calc(100% - {headerHeight}px);"
    class="flex w-full overflow-auto">
    <Altitude />
    <Altitude />
    <Altitude />
    <Altitude />
  </div>
</section>
