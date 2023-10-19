<script lang="ts">
  import Gyroscope from './charts/Gyroscope.svelte';
  import Acceleration from './charts/Acceleration.svelte';
  import Altitude from './charts/Altitude.svelte';
  import Airpressure from './charts/Airpressure.svelte';
  import BatteryVoltage from './charts/BatteryVoltage.svelte';
  import Temperature from './charts/Temperature.svelte';
  import SectionHeader from '../SectionHeader.svelte';
  import TiltAngle from './charts/TiltAngle.svelte';
  import AirSpeed from './charts/AirSpeed.svelte';
  import CommandEcho from './charts/CommandEcho.svelte';
  import GpsCoordinates from './charts/GpsCoordinates.svelte';
  import Longitude from './charts/Longitude.svelte';
  import SatellitesTracked from './charts/SatellitesTracked.svelte';
</script>

<section
  class="{$$props.class} flex h-full w-full flex-col space-y-6 overflow-x-scroll pt-5"
>
  <SectionHeader title="Payload" color="secondary" />

  <div class="grid h-full grid-cols-3 gap-[50px] overflow-x-scroll">
    <Altitude />
    <Airpressure />
    <Temperature />
    <BatteryVoltage />
    <TiltAngle />
    <AirSpeed />
    <CommandEcho />
    <GpsCoordinates />
    <Longitude />
    <SatellitesTracked />

    <Acceleration />
    <Gyroscope />
  </div>
</section>
