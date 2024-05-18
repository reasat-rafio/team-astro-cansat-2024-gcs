<script lang="ts">
  import Header from '../Header.svelte';
  import { slide } from 'svelte/transition';
  import { ScrollArea } from '@/components/ui/scroll-area/index.js';
  import { ScrollTextIcon } from 'lucide-svelte';
  import logStore from '@/stores/log.store';
  import formatDate from '@/lib/helpers/format-date';
  import { delay } from '@/lib/helpers/helper';
  import { uiStore } from '@/stores/ui.store';

  let sectionEl: HTMLElement;
  $: if ($logStore?.length) updateLogs();

  async function updateLogs() {
    if (!sectionEl) return;
    if (!$uiStore.lockLog) return;

    scrollToBottom();
  }

  async function scrollToBottom() {
    await delay(180).then(() => {
      sectionEl.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'end',
      });
    });
  }
</script>

<ScrollArea class="h-full w-full p-4 pb-5">
  <Header icon={ScrollTextIcon} title="Logs" />

  <div bind:this={sectionEl} class="mt-5 flex w-full flex-col gap-y-2">
    {#each $logStore as { value, time, state }, index}
      <div class="flex gap-5" transition:slide>
        <div class="flex-1">
          <span class="text-primary">{index + 1}.</span>
          <span
            class:text-red-600={state === 'error'}
            class:text-green-600={state === 'success'}
            class:text-foreground={state === 'info'}>
            {value}
          </span>
        </div>

        <div class="w-fit text-sm text-primary">
          {formatDate(time)}
        </div>
      </div>
    {/each}
  </div>
</ScrollArea>
