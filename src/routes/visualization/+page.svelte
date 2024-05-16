<script lang="ts">
  import Charts from '@/components/charts/Charts.svelte';
  import { uiStore } from '@/stores/ui.store';
  import VirtualList from 'svelte-tiny-virtual-list';
</script>

<VirtualList
  height="100%"
  width="100%"
  scrollDirection="vertical"
  itemCount={1}
  itemSize={850}>
  <section
    slot="item"
    class="h-full w-full [&>*]:border-gray-600 [&>*]:p-5"
    style="height: calc(100vh - {$uiStore.navbarHeight}px);">
    <div class="h-screen divide-y divide-gray-500">
      <Charts class="pt-0" />
    </div>
  </section>
</VirtualList>
