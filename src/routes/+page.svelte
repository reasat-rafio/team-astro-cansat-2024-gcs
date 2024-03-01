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
    <Resizable.Pane defaultSize={40}>
      <div class="flex h-[200px] items-center justify-center p-6">
        <span class="font-semibold">One</span>
      </div>
    </Resizable.Pane>
    <Resizable.Handle />
    <Resizable.Pane defaultSize={60}>
      <Resizable.PaneGroup direction="vertical">
        <Resizable.Pane defaultSize={60}>
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Two</span>
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
  <Outputs />
  <SystemSteps />
  <Streams />
  <Charts /> -->
</section>
