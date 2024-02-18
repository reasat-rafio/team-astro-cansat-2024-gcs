<script lang="ts">
  import type { TerminalActorContext } from '@/lib/@types/app.types';
  import { cn } from '@/lib/cn';
  import { getContext } from 'svelte';
  import { slide } from 'svelte/transition';
  import ExpendIcon from '../icons/ExpendIcon.svelte';
  import MinimizeIcon from '../icons/MinimizeIcon.svelte';
  import TerminalIcon from '../icons/TerminalIcon.svelte';
  import History from './History.svelte';
  import Input from './Input.svelte';
  import terminalStore from '@/stores/terminal.temp.store';

  let inputEl: HTMLSpanElement;
  let activeSuggestedCommand: string | null = null;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<aside
  role="button"
  tabindex="0"
  on:click={() => inputEl.focus()}
  class={cn(
    'fixed bottom-0 right-0 z-50 w-full overflow-hidden rounded-md transition-all duration-300',
    {
      'max-w-xs': $terminalStore.uiState === 'minimize',
      'max-w-4xl': $terminalStore.uiState === 'maximize',
    },
  )}>
  <div class="flex justify-between bg-surface-500 p-2">
    <TerminalIcon />
    <div class="flex gap-4">
      <button on:click={() => terminalStore.setUiState('minimize')}>
        <MinimizeIcon />
      </button>
      <button on:click={() => terminalStore.setUiState('maximize')}>
        <ExpendIcon />
      </button>
    </div>
  </div>
  {#if $terminalStore.uiState === 'maximize'}
    <div
      transition:slide
      class="h-[450px] space-y-2 overflow-y-auto bg-black/40 p-2 backdrop-blur-lg">
      <History />

      <Input bind:inputEl bind:activeSuggestedCommand />
    </div>
  {/if}
</aside>
