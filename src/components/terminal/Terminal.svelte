<script lang="ts">
  import { cn } from '@/lib/cn';
  import terminalStore from '@/stores/terminal/terminal.store';
  import { Maximize, Minus, Terminal } from 'lucide-svelte';
  import { slide } from 'svelte/transition';
  import CommandDropDown from './CommandDropDown.svelte';
  import History from './History.svelte';
  import Input from './Input.svelte';
  import commandHistoryStore from '@/stores/command.history.store';
  import { ScrollArea } from '@/components/ui/scroll-area/index.js';
  import { uiStore } from '@/stores/ui.store';

  // let inputEl: HTMLSpanElement;
  let maximizeBlockEl: HTMLDivElement;

  $: if ($commandHistoryStore?.commandHistory?.length && maximizeBlockEl) {
    maximizeBlockEl.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<aside
  role="button"
  tabindex="0"
  on:click={() => $uiStore.terminalInputEl?.focus()}
  class={cn(
    'fixed bottom-0 right-0 z-50 w-full overflow-hidden rounded-md border border-primary bg-popover transition-all duration-300',
    {
      'max-w-xs': $terminalStore.terminalUiState === 'minimize',
      'max-w-4xl': $terminalStore.terminalUiState === 'maximize',
    },
  )}>
  <button
    on:click={() => terminalStore.setUiState('maximize')}
    class="flex w-full items-center justify-between bg-secondary p-1">
    <div class="flex items-center gap-2">
      <Terminal size={20} />
      {#if $terminalStore.terminalUiState === 'maximize'}
        <CommandDropDown />
      {/if}
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
    <div bind:this={maximizeBlockEl} transition:slide class="backdrop-blur-md">
      <ScrollArea class={cn(" space-y-2 p-2 pb-5 pr-5 transition-all duration-300",
        {
          'h-[20px]': $terminalStore.terminalUiState === 'minimize',
          'h-[450px]': $terminalStore.terminalUiState === 'maximize',
        }
      )}>
        <History />

        <Input />
      </ScrollArea>
    </div>
</aside>
