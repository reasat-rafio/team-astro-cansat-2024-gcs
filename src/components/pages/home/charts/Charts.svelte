<script lang="ts">
  import VisualIcon from '@/components/icons/VisualIcon.svelte';
  import Header from '../Header.svelte';
  import Altitude from '../../visualization/payload/charts/Altitude.svelte';
  import AirPressure from '../../visualization/payload/charts/AirPressure.svelte';
  import Temperature from '../../visualization/payload/charts/Temperature.svelte';
</script>

<section class="overflow-auto col-span-6 row-start-1 col-start-7 row-span-1">
  <Header icon={VisualIcon} title="Charts" />

  <div class="flex gap-x-4 [&>*]:!w-[500px] overflow-auto">
    <Altitude />
    <AirPressure />
    <Temperature />
    <AirPressure />
    <Temperature />
  </div>
</section>
