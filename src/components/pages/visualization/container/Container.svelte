<script lang="ts">
  import SectionHeader from '../SectionHeader.svelte';
  import Acceleration from './graphs/Acceleration.svelte';
  import Altitude from './graphs/Altitude.svelte';
  import Gyroscope from './graphs/Gyroscope.svelte';
  import Humidity from './graphs/Humidity.svelte';
  import Pressure from './graphs/Pressure.svelte';
  import Temperature from './graphs/Temperature.svelte';
</script>

<section
  class="{$$props.class} flex h-full w-full flex-col space-y-6 overflow-x-scroll"
>
  <SectionHeader title="Container" />
  <div class="grid h-full grid-cols-3 gap-[50px] overflow-x-scroll">
    <Temperature />
    <Humidity />
    <Pressure />
    <Altitude />
    <Acceleration />
    <Gyroscope />
  </div>
</section>
