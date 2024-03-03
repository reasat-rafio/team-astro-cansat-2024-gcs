<script lang="ts">
  import Charts from '@/components/pages/home/charts/Charts.svelte';
  import Outputs from '@/components/pages/home/outputs/Outputs.svelte';
  import Streams from '@/components/pages/home/streams/Streams.svelte';
  import SystemSteps from '@/components/pages/home/operation-status/OperationStatus .svelte';
  import { navbarHeight } from '@/stores/ui.store.';
  import * as Resizable from '@/components/ui/resizable';
</script>

<section style="height: calc(100vh - {$navbarHeight}px);" class="">
  <Resizable.PaneGroup direction="horizontal" class="w-full rounded-lg border">
    <Resizable.Pane defaultSize={25}>
      <SystemSteps />
    </Resizable.Pane>
    <Resizable.Handle />

    <Resizable.Pane defaultSize={15}>
      <Outputs />
    </Resizable.Pane>

    <Resizable.Handle />
    <Resizable.Pane defaultSize={60}>
      <Resizable.PaneGroup direction="vertical">
        <Resizable.Pane defaultSize={60}>
          <Charts />
        </Resizable.Pane>
        <Resizable.Handle />
        <Resizable.Pane defaultSize={40}>
          <Streams />
        </Resizable.Pane>
      </Resizable.PaneGroup>
    </Resizable.Pane>
  </Resizable.PaneGroup>
</section>
