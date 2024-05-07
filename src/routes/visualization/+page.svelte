<script lang="ts">
  import Charts from '@/components/charts/Charts.svelte';
  import { ScrollArea } from '@/components/ui/scroll-area/index.js';
  import { uiStore } from '@/stores/ui.store';
</script>

<section
  class="w-full [&>*]:border-gray-600 [&>*]:p-5"
  style="height: calc(100vh - {$uiStore.navbarHeight}px);">
  <ScrollArea class="h-full w-full">
    <div class="h-screen divide-y divide-gray-500">
      <Charts class="pt-0" />
    </div>
  </ScrollArea>
</section>
