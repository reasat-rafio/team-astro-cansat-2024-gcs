<script lang="ts">
  import { formatDate } from '@/lib/helper';
  import Prompt from './Prompt.svelte';
  import ChevronRight from '../icons/ChevronRight.svelte';
  import { slide } from 'svelte/transition';
  import terminalStore from '@/stores/terminal.temp.store';

  // const { snapshot } = $terminalStore;
</script>

{#if !!$terminalStore.commandHistory?.length}
  <div class="flex flex-col gap-y-2">
    {#each $terminalStore.commandHistory as { output, time, value }}
      <div transition:slide={{ duration: 300 }} class="flex flex-col">
        <div class="flex justify-between gap-x-2">
          <Prompt />
          <div class="w-fit flex-1 flex-wrap break-words">
            {value}
          </div>
          <span class="text-xs text-green-300">
            {formatDate(time)}
          </span>
        </div>

        <p class="flex text-sm">
          <ChevronRight class="pt-1 text-green-300" />
          <span class="whitespace-pre-line">
            {@html output}
          </span>
        </p>
      </div>
    {/each}
  </div>
{/if}
