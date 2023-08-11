<script lang="ts">
  import SectionHeader from '../SectionHeader.svelte';
  import Acceleration from './charts/Acceleration.svelte';
  import Altitude from './charts/Altitude.svelte';
  import Gyroscope from './charts/Gyroscope.svelte';
  import Humidity from './charts/Humidity.svelte';
  import Pressure from './charts/Pressure.svelte';
  import Temperature from './charts/Temperature.svelte';
</script>

<section
  class="{$$props.class} flex h-full w-full flex-col space-y-6 overflow-x-scroll pb-5"
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
