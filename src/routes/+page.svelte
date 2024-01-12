<script lang="ts">
  import Charts from '@/components/pages/home/charts/Charts.svelte';
  import DataGroups from '@/components/pages/home/data-groups/DataGroups.svelte';
  import Outputs from '@/components/pages/home/outputs/Outputs.svelte';
  import Streams from '@/components/pages/home/streams/Streams.svelte';
  import SystemSteps from '@/components/pages/home/system-steps/SystemSteps.svelte';
  import { navbarHeight } from '@/stores/ui.store.';
</script>

<section
  style="height: calc(100vh - {$navbarHeight}px);"
  class="grid grid-cols-12 grid-rows-2 gap-5 px-5 py-5">
  <DataGroups />
  <Outputs />
  <SystemSteps />
  <Streams />
  <!-- <Charts /> -->
</section>
