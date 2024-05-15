<script lang="ts">
  import Header from '../Header.svelte';
  // import { afterUpdate } from 'svelte';
  import { slide } from 'svelte/transition';
  import { ScrollArea } from '@/components/ui/scroll-area/index.js';
  import { ScrollTextIcon } from 'lucide-svelte';
  import logStore from '@/stores/log.store';
  import formatDate from '@/lib/helpers/format-date';

  let sectionEl: HTMLElement;
  let inputEl: HTMLInputElement;

  // afterUpdate(() => {
  //   scrollToBottom();
  // });

  $: if ($logStore.length) {
    scrollToBottom();
  }

  function scrollToBottom() {
    if (sectionEl) {
      sectionEl.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }
</script>

<ScrollArea class="h-full w-full p-4 pb-5">
  <Header icon={ScrollTextIcon} title="Logs" />

  <div bind:this={sectionEl} class="mt-5 flex w-full flex-col gap-y-2">
    {#each $logStore as { value, time }, index}
      <div class="flex gap-5" transition:slide>
        <div class="flex-1">
          <span class="text-primary">{index + 1}.</span>
          <span>{value}</span>
        </div>

        <div class="w-fit text-sm text-primary">
          {formatDate(time)}
        </div>
      </div>
    {/each}
  </div>
  <input bind:this={inputEl} type="text" />
</ScrollArea>
