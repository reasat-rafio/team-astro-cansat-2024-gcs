<script lang="ts">
  import { cn } from '@/lib/cn';
  import ExpendIcon from './icons/ExpendIcon.svelte';
  import MinimizeIcon from './icons/MinimizeIcon.svelte';
  import TerminalIcon from './icons/TerminalIcon.svelte';
  import RocketIcon from './icons/RocketIcon.svelte';
  import { slide } from 'svelte/transition';

  let terminalState: 'minimize' | 'maximize' = 'maximize';
</script>

<aside
  class={cn(
    'fixed bottom-0 right-0 rounded-md overflow-hidden w-full z-50 transition-all duration-300',
    {
      'max-w-xs': terminalState === 'minimize',
      'max-w-4xl': terminalState === 'maximize'
    }
  )}
>
  <div class="flex justify-between bg-surface-500 p-2">
    <TerminalIcon />
    <div class="flex gap-4">
      <button on:click={() => (terminalState = 'minimize')}>
        <MinimizeIcon />
      </button>
      <button on:click={() => (terminalState = 'maximize')}>
        <ExpendIcon />
      </button>
    </div>
  </div>
  {#if terminalState === 'maximize'}
    <div
      transition:slide
      class="flex gap-x-2 p-2 bg-black/40 backdrop-blur-lg h-[450px]"
    >
      <span class="flex gap-x-1 text-[#4AF626] h-fit items-center">
        <RocketIcon />
        <span>qubit:~$ </span>
      </span>
      <input
        class="flex-1 h-fit bg-transparent border-none outline-none"
        type="text"
      />
    </div>
  {/if}
</aside>
