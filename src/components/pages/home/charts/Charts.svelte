<script lang="ts">
  import VisualIcon from '@/components/icons/VisualIcon.svelte';
  import Header from '../Header.svelte';
  import Altitude from '../../visualization/charts/Altitude.svelte';
  import AirPressure from '../../visualization/charts/AirPressure.svelte';
  import Temperature from '../../visualization/charts/Temperature.svelte';
  import AirSpeed from '../../visualization/charts/AirSpeed.svelte';
  import BatteryVoltage from '../../visualization/charts/BatteryVoltage.svelte';
  import GpsCoordinates from '../../visualization/charts/GpsCoordinates.svelte';
  import TiltAngle from '../../visualization/charts/TiltAngle.svelte';
</script>

<section class="col-span-6 col-start-7 row-span-1 row-start-1 overflow-auto">
  <Header icon={VisualIcon} title="Charts" />

  <div class="flex gap-x-4 overflow-auto [&>*]:!w-[500px]">
    <Altitude />
    <AirPressure />
    <Temperature />
    <AirSpeed />
    <BatteryVoltage />
    <GpsCoordinates />
    <TiltAngle />
  </div>
</section>
