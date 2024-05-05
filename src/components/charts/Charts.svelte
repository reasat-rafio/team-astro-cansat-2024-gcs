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
  <SectionHeader title="Payload" color="primary" />

  <div class="grid grid-cols-2 gap-[50px] [&>*]:h-[600px]">
    <Altitude width="auto" />
    <AirPressure width="auto" />
    <AirSpeed width="auto" />
    <Temperature width="auto" />
    <BatteryVoltage width="auto" />
    <TiltAngle width="auto" />
    <GpsCoordinates width="auto" />
    <!-- <CommandEcho />
    <Longitude />
    <SatellitesTracked />
    <Acceleration />
    <Gyroscope />  -->
  </div>
</section>
