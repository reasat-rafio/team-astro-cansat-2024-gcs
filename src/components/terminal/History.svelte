<script lang="ts">
  import { formatDate } from '@/lib/helper';
  import Prompt from './Prompt.svelte';
  import ChevronRight from '../icons/ChevronRight.svelte';
  import { slide } from 'svelte/transition';
  import commandHistoryStore from '@/stores/command.history.store';
</script>

{#if !!$commandHistoryStore.commandHistory?.length}
  <div class="flex flex-col gap-y-2">
    {#each $commandHistoryStore.commandHistory as { output, time, value }}
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
