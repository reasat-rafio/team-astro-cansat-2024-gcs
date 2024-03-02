<script lang="ts">
  import { cn } from '@/lib/cn';
  import { slide } from 'svelte/transition';
  import ExpendIcon from '../icons/ExpendIcon.svelte';
  import MinimizeIcon from '../icons/MinimizeIcon.svelte';
  import TerminalIcon from '../icons/TerminalIcon.svelte';
  import History from './History.svelte';
  import Input from './Input.svelte';
  import terminalStore from '@/stores/terminal.temp.store';
  import CommandDropDown from './CommandDropDown.svelte';

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
    'fixed bottom-0 right-0 z-50 w-full overflow-hidden rounded-md border border-gray-900 bg-secondary transition-all  duration-300',
    {
      'max-w-lg': $terminalStore.uiState === 'minimize',
      'max-w-4xl': $terminalStore.uiState === 'maximize',
    },
  )}>
  <button
    on:click={() => terminalStore.setUiState('maximize')}
    class="flex w-full items-center justify-between bg-gray-900 p-1">
    <div class="flex items-center gap-2">
      <TerminalIcon />
      <CommandDropDown />
    </div>

    <div class="flex gap-4">
      <button
        on:click|stopPropagation={() => terminalStore.setUiState('minimize')}>
        <MinimizeIcon />
      </button>
      <button
        on:click|stopPropagation={() => terminalStore.setUiState('maximize')}>
        <ExpendIcon />
      </button>
    </div>
  </button>
  {#if $terminalStore.uiState === 'maximize'}
    <div
      transition:slide
      class="h-[450px] space-y-2 overflow-y-auto bg-background p-2 scrollbar-thin">
      <History />

      <Input bind:inputEl bind:activeSuggestedCommand />
    </div>
  {/if}
</aside>
