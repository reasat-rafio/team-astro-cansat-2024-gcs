<script lang="ts">
  import { cn } from '@/lib/cn';
  import terminalStore from '@/stores/terminal/terminal.store';
  import { Maximize, Minus, Terminal } from 'lucide-svelte';
  import { slide } from 'svelte/transition';
  import CommandDropDown from './CommandDropDown.svelte';
  import History from './History.svelte';
  import Input from './Input.svelte';

  let inputEl: HTMLSpanElement;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<aside
  role="button"
  tabindex="0"
  on:click={() => inputEl.focus()}
  class={cn(
    'fixed bottom-0 right-0 z-50 w-full overflow-hidden rounded-md border border-primary bg-popover transition-all duration-300',
    {
      'max-w-lg': $terminalStore.terminalUiState === 'minimize',
      'max-w-4xl': $terminalStore.terminalUiState === 'maximize',
    },
  )}>
  <button
    on:click={() => terminalStore.setUiState('maximize')}
    class="flex w-full items-center justify-between bg-secondary p-1">
    <div class="flex items-center gap-2">
      <Terminal size={20} />
      <CommandDropDown />
    </div>

    <div class="flex gap-4 text-popover-foreground">
      <button
        on:click|stopPropagation={() => terminalStore.setUiState('minimize')}>
        <Minus size={18} />
      </button>
      <button
        on:click|stopPropagation={() => terminalStore.setUiState('maximize')}>
        <Maximize size={18} />
      </button>
    </div>
  </button>
  {#if $terminalStore.terminalUiState === 'maximize'}
    <div
      transition:slide
      class="h-[450px] space-y-2 overflow-y-auto p-2 backdrop-blur-md scrollbar-thin">
      <History />

      <Input bind:inputEl />
    </div>
  {/if}
</aside>
