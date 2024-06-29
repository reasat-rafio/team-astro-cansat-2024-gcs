<script lang="ts">
  import Altitude from './Altitude.svelte';
  import AirPressure from './AirPressure.svelte';
  import BatteryVoltage from './BatteryVoltage.svelte';
  import Temperature from './Temperature.svelte';
  import SectionHeader from '../pages/visualization/SectionHeader.svelte';
  import TiltAngle from './TiltAngle.svelte';
  import AirSpeed from './AirSpeed.svelte';
  import GpsCoordinates from './GpsCoordinates.svelte';
  import { cn } from '@/utils';

  // import Gyroscope from './Gyroscope.svelte';
  // import Acceleration from './Acceleration.svelte';
  // import CommandEcho from './charts/CommandEcho.svelte';
  // import Longitude from './Longitude.svelte';
  // import SatellitesTracked from './SatellitesTracked.svelte';
</script>

<section
  class={cn('flex h-full w-full flex-col space-y-6 pt-5', $$props.class)}>
  <SectionHeader />

  <div class="grid grid-cols-3 gap-[50px]">
    <Altitude width="100%" height="350px" />
    <AirPressure width="100%" height="350px" />
    <AirSpeed width="100%" height="350px" />
    <Temperature width="100%" height="350px" />
    <BatteryVoltage width="100%" height="350px" />
    <TiltAngle width="100%" height="350px" />
    <GpsCoordinates width="100%" height="350px" />
    <!-- <CommandEcho />
    <Longitude />
    <SatellitesTracked />
    <Acceleration />
    <Gyroscope />  -->
  </div>
</section>
