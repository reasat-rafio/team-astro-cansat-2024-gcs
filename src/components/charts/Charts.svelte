<script lang="ts">
  import Gyroscope from './Gyroscope.svelte';
  import Acceleration from './Acceleration.svelte';
  import Altitude from './Altitude.svelte';
  import AirPressure from './AirPressure.svelte';
  import BatteryVoltage from './BatteryVoltage.svelte';
  import Temperature from './Temperature.svelte';
  import SectionHeader from '../pages/visualization/SectionHeader.svelte';
  import TiltAngle from './TiltAngle.svelte';
  import AirSpeed from './AirSpeed.svelte';
  // import CommandEcho from './charts/CommandEcho.svelte';
  import GpsCoordinates from './GpsCoordinates.svelte';
  import Longitude from './Longitude.svelte';
  import SatellitesTracked from './SatellitesTracked.svelte';
</script>

<section
  class="{$$props.class} flex h-full w-full flex-col space-y-6 overflow-x-scroll pt-5">
  <SectionHeader title="Payload" color="secondary" />

  <div class="grid h-full grid-cols-3 gap-[50px] overflow-x-scroll">
    <Altitude />
    <AirPressure />
    <Temperature />
    <BatteryVoltage />
    <TiltAngle />
    <AirSpeed />
    <GpsCoordinates />
    <!-- <CommandEcho />
    <Longitude />
    <SatellitesTracked />

    <Acceleration />
    <Gyroscope />  -->
  </div>
</section>
