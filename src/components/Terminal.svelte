<script lang="ts">
  import { cn } from '@/lib/cn';
  import terminalMachine from '@/machines/terminal-machine';
  import { useActor } from '@xstate/svelte';
  import { slide } from 'svelte/transition';
  import ExpendIcon from './icons/ExpendIcon.svelte';
  import MinimizeIcon from './icons/MinimizeIcon.svelte';
  import RocketIcon from './icons/RocketIcon.svelte';
  import TerminalIcon from './icons/TerminalIcon.svelte';

  let inputEl: HTMLSpanElement;
  const { snapshot, send } = useActor(terminalMachine);

  function focusInputElement() {
    inputEl.focus();
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<aside
  role="button"
  tabindex="0"
  on:click={focusInputElement}
  class={cn(
    'fixed bottom-0 right-0 rounded-md overflow-hidden w-full z-50 transition-all duration-300',
    {
      'max-w-xs': $snapshot.matches('minimize'),
      'max-w-4xl': $snapshot.matches('maximize')
    }
  )}
>
  <div class="flex justify-between bg-surface-500 p-2">
    <TerminalIcon />
    <div class="flex gap-4">
      <button on:click={() => send({ type: 'MINIMIZE' })}>
        <MinimizeIcon />
      </button>
      <button on:click={() => send({ type: 'MAXIMIZE' })}>
        <ExpendIcon />
      </button>
    </div>
  </div>
  {#if $snapshot.matches('maximize')}
    <div
      transition:slide
      class="flex gap-x-2 p-2 bg-black/40 backdrop-blur-lg h-[450px] overflow-y-auto"
    >
      <span class="flex gap-x-1 text-[#4AF626] h-fit items-center">
        <RocketIcon />
        <span>qubit:~$ </span>
      </span>

      <!-- svelte-ignore a11y-interactive-supports-focus -->
      <span
        bind:this={inputEl}
        on:keydown={(e) => {
          if (e.currentTarget && e.key === 'Enter') {
            send({
              type: 'ENTER_COMMAND',
              command: e.currentTarget.innerText
            });
            e.currentTarget.innerText = '';
          }
        }}
        class="flex-1 h-fit bg-transparent border-none outline-none overflow-hidden resize-y block"
        role="textbox"
        contenteditable
      />
    </div>
  {/if}
</aside>
