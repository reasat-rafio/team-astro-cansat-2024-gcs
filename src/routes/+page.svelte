<script lang="ts">
  import DataGroups from '@/components/pages/home/data-groups/DataGroups.svelte';
  import Outputs from '@/components/pages/home/outputs/Outputs.svelte';
  import Streams from '@/components/pages/home/streams/Streams.svelte';
  import SystemSteps from '@/components/pages/home/system-steps/SystemSteps.svelte';
  import { navbarHeight } from '@/stores/ui.store.';
</script>

<section
  style="height: calc(100vh - {$navbarHeight}px);"
  class="flex h-full flex-col"
>
  <section
    class="grid grid-cols-2 grid-rows-2 pt-5 [&>*:nth-child(even)]:border-s"
  >
    <DataGroups />
    <!-- <SystemSteps />
    <Outputs />
    <Streams /> -->
  </section>
</section>
