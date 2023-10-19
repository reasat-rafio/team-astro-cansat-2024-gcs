<script lang="ts">
  import Gyroscope from './charts/Gyroscope.svelte';
  import Acceleration from './charts/Acceleration.svelte';
  import Altitude from './charts/Altitude.svelte';
  import Airpressure from './charts/Airpressure.svelte';
  import Pressure from './charts/Pressure.svelte';
  import Temperature from './charts/Temperature.svelte';
  import SectionHeader from '../SectionHeader.svelte';
</script>

<section
  class="{$$props.class} flex h-full w-full flex-col space-y-6 overflow-x-scroll pt-5"
>
  <SectionHeader title="Payload" color="secondary" />

  <div class="grid h-full grid-cols-3 gap-[50px] overflow-x-scroll">
    <Altitude />
    <Airpressure />
    <Temperature />
    <Pressure />
    <Acceleration />
    <Gyroscope />
  </div>
</section>
