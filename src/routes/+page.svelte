<script lang="ts">
  import Charts from '@/components/pages/home/charts/Charts.svelte';
  import Logs from '@/components/pages/home/logs/Logs.svelte';
  import SystemSteps from '@/components/pages/home/operation-status/OperationStatus .svelte';
  import Outputs from '@/components/pages/home/outputs/Outputs.svelte';
  import * as Resizable from '@/components/ui/resizable';
  import { uiStore } from '@/stores/ui.store';

  let logPlaneSize = 0;
</script>

<section style="height: calc(100vh - {$uiStore.navbarHeight}px);">
  <Resizable.PaneGroup direction="horizontal" class="w-full rounded-lg border">
    <Resizable.Pane defaultSize={25}>
      <SystemSteps />
    </Resizable.Pane>
    <Resizable.Handle withHandle />

    <Resizable.Pane defaultSize={15}>
      <Outputs />
    </Resizable.Pane>

    <Resizable.Handle withHandle />
    <Resizable.Pane defaultSize={60}>
      <Resizable.PaneGroup direction="vertical">
        <Resizable.Pane defaultSize={60}>
          <Charts />
        </Resizable.Pane>
        <Resizable.Handle withHandle />
        <Resizable.Pane
          defaultSize={40}
          onResize={(size) => (logPlaneSize = size)}>
          {#key logPlaneSize}
            <Logs />
          {/key}
        </Resizable.Pane>
      </Resizable.PaneGroup>
    </Resizable.Pane>
  </Resizable.PaneGroup>
</section>
