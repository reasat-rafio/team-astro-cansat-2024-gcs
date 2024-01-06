<script lang="ts">
  import type { TerminalContext } from '@/lib/@types/app.types';
  import { cn } from '@/lib/cn';
  import { formatDate } from '@/lib/helper';
  import terminalMachine from '@/machines/terminal-machine';
  import { useActor } from '@xstate/svelte';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import type { Snapshot } from 'xstate';
  import ChevronRight from '../icons/ChevronRight.svelte';
  import ExpendIcon from '../icons/ExpendIcon.svelte';
  import MinimizeIcon from '../icons/MinimizeIcon.svelte';
  import TerminalIcon from '../icons/TerminalIcon.svelte';
  import Prompt from './Prompt.svelte';

  let inputEl: HTMLSpanElement;

  const { snapshot, send, actorRef } = useActor(terminalMachine, {
    snapshot: JSON.parse(
      localStorage?.getItem('terminal_persisted_state') as string
    ) as Snapshot<TerminalContext>
  });

  onMount(() => {
    const storeRef = actorRef.subscribe(() => {
      const persistedState = actorRef.getPersistedSnapshot();
      localStorage.setItem(
        'terminal_persisted_state',
        JSON.stringify(persistedState)
      );
    });

    return () => storeRef.unsubscribe();
  });

  type Event = KeyboardEvent & {
    currentTarget: EventTarget & HTMLSpanElement;
  };

  function submitCommand(e: Event) {
    if (e.currentTarget && e.key === 'Enter') {
      e.preventDefault();
      send({
        type: 'SUBMIT_COMMAND',
        command: e.currentTarget.innerText
      });
      e.currentTarget.innerText = '';
    }
  }

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
      class="p-2 bg-black/40 backdrop-blur-lg h-[450px] overflow-y-auto space-y-2"
    >
      <!-- HISTORY -->
      {#if !!$snapshot.context.commandHistory?.length}
        <div class="flex flex-col gap-y-2">
          {#each $snapshot.context.commandHistory as { text, timestamp, output }}
            <div transition:slide={{ duration: 300 }} class="flex flex-col">
              <div class="flex justify-between gap-x-2">
                <Prompt />
                <div class="flex-1 flex-wrap break-words w-fit">
                  {text}
                </div>
                <span class="text-xs text-green-300">
                  {formatDate(timestamp)}
                </span>
              </div>

              <p class="text-sm flex">
                <ChevronRight class="text-green-300 pt-1" />
                <span class="whitespace-pre-line">
                  {output}
                </span>
              </p>
            </div>
          {/each}
        </div>
      {/if}
      <!-- HISTORY END -->
      <div class="flex gap-x-2">
        <Prompt />

        <!-- svelte-ignore a11y-interactive-supports-focus -->
        <span
          bind:this={inputEl}
          on:keydown={submitCommand}
          data-placeholder="Type help to get started."
          class="flex-1 h-fit bg-transparent border-none outline-none overflow-hidden resize-y block"
          role="textbox"
          contenteditable
        />
      </div>
    </div>
  {/if}
</aside>
