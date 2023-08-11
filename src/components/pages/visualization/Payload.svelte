<script lang="ts">
  import Acceleration from './container/graphs/Acceleration.svelte';
  import Altitude from './container/graphs/Altitude.svelte';
  import Gyroscope from './container/graphs/Gyroscope.svelte';
  import Humidity from './container/graphs/Humidity.svelte';
  import Pressure from './container/graphs/Pressure.svelte';
  import Temperature from './payload/graphs/Temperature.svelte';
  import SectionHeader from './SectionHeader.svelte';
</script>

<section
  class="{$$props.class} flex h-full w-full flex-col space-y-6 overflow-x-scroll"
>
  <SectionHeader title="Payload" color="secondary" />

  <div class="grid h-full grid-cols-3 gap-[50px] overflow-x-scroll">
    <Temperature />
    <Humidity />
    <Pressure />
    <Altitude />
    <Acceleration />
    <Gyroscope />
  </div>
</section>
