<script lang="ts">
  import Header from '../Header.svelte';
  import { afterUpdate } from 'svelte';
  import csvStore from '@/stores/csv.store';
  import { slide } from 'svelte/transition';
  import { ScrollArea } from '@/components/ui/scroll-area/index.js';
  import { RocketIcon } from 'lucide-svelte';

  let sectionEl: HTMLElement;

  afterUpdate(() => {
    scrollToBottom();
  });

  function scrollToBottom() {
    if (sectionEl) {
      sectionEl.scrollTop = sectionEl.scrollHeight;
    }
  }
</script>

<ScrollArea class="h-full w-full p-4 pb-5">
  <Header icon={RocketIcon} title="Streams" />

  <div class="mt-5 flex w-full flex-col gap-y-4">
    {#each $csvStore.streams as stream, index}
      <p transition:slide>
        <span class="text-secondary-500">{index + 1}.</span>
        <span>{stream}</span>
      </p>
    {/each}
  </div>
</ScrollArea>
