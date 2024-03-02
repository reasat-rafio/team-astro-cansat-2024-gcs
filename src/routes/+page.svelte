<script lang="ts">
  import Charts from '@/components/pages/home/charts/Charts.svelte';
  import DataGroups from '@/components/pages/home/data-groups/DataGroups.svelte';
  import Outputs from '@/components/pages/home/outputs/Outputs.svelte';
  import Streams from '@/components/pages/home/streams/Streams.svelte';
  import SystemSteps from '@/components/pages/home/system-steps/SystemSteps.svelte';
  import { navbarHeight } from '@/stores/ui.store.';
  import * as Resizable from '@/components/ui/resizable';
</script>

<section style="height: calc(100vh - {$navbarHeight}px);" class="">
  <Resizable.PaneGroup direction="horizontal" class="w-full rounded-lg border">
    <Resizable.Pane defaultSize={25}>
      <div class="flex h-full p-4">
        <SystemSteps />
      </div>
    </Resizable.Pane>
    <Resizable.Handle />

    <Resizable.Pane defaultSize={15}>
      <div class="flex h-full p-4">
        <Outputs />
      </div>
    </Resizable.Pane>

    <Resizable.Handle />
    <Resizable.Pane defaultSize={60}>
      <Resizable.PaneGroup direction="vertical">
        <Resizable.Pane defaultSize={60}>
          <div class="flex h-full p-4">
            <Charts />
          </div>
        </Resizable.Pane>
        <Resizable.Handle />
        <Resizable.Pane defaultSize={40}>
          <div class="flex h-full p-4">
            <Streams />
          </div>
        </Resizable.Pane>
      </Resizable.PaneGroup>
    </Resizable.Pane>
  </Resizable.PaneGroup>
  <!-- <DataGroups />
  <Streams />
  <Charts /> -->
</section>
