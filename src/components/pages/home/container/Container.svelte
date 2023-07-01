<script>
  import DataGroups from './data-groups/DataGroups.svelte';
  import SystemSteps from './system-steps/SystemSteps.svelte';
  import Outputs from './outputs/Outputs.svelte';
  import Streams from './streams/Streams.svelte';
</script>

<section class="flex h-full flex-col">
  <h3 class="btn variant-ghost-surface pointer-events-none w-full rounded">
    <span class="h4 text-center font-semibold">Container</span>
  </h3>

  <section
    class="grid flex-1 grid-cols-2 grid-rows-2 pt-5 [&>*:nth-child(even)]:border-s"
  >
    <DataGroups />
    <SystemSteps />
    <Outputs />
    <Streams />
  </section>
</section>
