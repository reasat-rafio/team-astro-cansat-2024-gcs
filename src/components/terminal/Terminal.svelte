<script lang="ts">
  import type { TerminalContext } from '@/lib/@types/app.types';
  import { cn } from '@/lib/cn';
  import { formatDate } from '@/lib/helper';
  import terminalMachine, { validCommands } from '@/machines/terminal-machine';
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
  let suggestedCommands: string[] | null = null;
  let activeSuggestedCommand: string | null = null;
  let activeSuggestedCommandIndex = 0;

  const { snapshot, send, actorRef } = useActor(terminalMachine, {
    snapshot: JSON.parse(
      localStorage?.getItem('terminal_persisted_state') as string,
    ) as Snapshot<TerminalContext>,
  });

  onMount(() => {
    const storeRef = actorRef.subscribe(() => {
      const persistedState = actorRef.getPersistedSnapshot();
      localStorage.setItem(
        'terminal_persisted_state',
        JSON.stringify(persistedState),
      );
    });

    return () => storeRef.unsubscribe();
  });

  type KEvent = KeyboardEvent & {
    currentTarget: EventTarget & HTMLSpanElement;
  };

  function keyPressAction(e: KEvent) {
    suggestCommand(e);
    cycleSuggestedCommand(e);
    submitCommand(e);
    autoWriteSuggestedCommand(e);
  }

  function autoWriteSuggestedCommand(e: KEvent) {
    if (!!suggestedCommands?.length) {
      if (e.currentTarget && e.key === 'Control') {
        e.preventDefault();
        inputEl.innerHTML = activeSuggestedCommand || '';
      }
    }
  }

  function cycleSuggestedCommand(e: KEvent) {
    if (!!suggestedCommands?.length) {
      if (e.currentTarget && e.key === 'ArrowDown') {
        activeSuggestedCommandIndex =
          (activeSuggestedCommandIndex - 1 + suggestedCommands.length) %
          suggestedCommands.length;
        activeSuggestedCommand = suggestedCommands[activeSuggestedCommandIndex];
      } else if (e.currentTarget && e.key === 'ArrowUp') {
        activeSuggestedCommandIndex =
          (activeSuggestedCommandIndex + 1) % suggestedCommands.length;
        activeSuggestedCommand = suggestedCommands[activeSuggestedCommandIndex];
      }
    }
  }

  function suggestCommand(e: KEvent) {
    let userInput = e.currentTarget.innerText;

    if (
      (typeof userInput === 'string' && userInput.length === 0) ||
      userInput === null
    )
      return null;

    const suggestions = Object.keys(validCommands).filter((command) =>
      command.toLowerCase().includes(userInput.toLowerCase()),
    );
    suggestedCommands = suggestions;
    activeSuggestedCommand = !!suggestions?.length
      ? suggestions[activeSuggestedCommandIndex]
      : null;
  }

  function submitCommand(e: KEvent) {
    if (e.currentTarget && e.key === 'Enter') {
      e.preventDefault();
      send({
        type: 'SUBMIT_COMMAND',
        command: e.currentTarget.innerText.trim(),
      });
      e.currentTarget.innerText = '';
    }
  }
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
      'max-w-xs': $snapshot.matches('minimize'),
      'max-w-4xl': $snapshot.matches('maximize'),
    },
  )}>
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
      class="h-[450px] space-y-2 overflow-y-auto bg-black/40 p-2 backdrop-blur-lg">
      <!-- HISTORY -->
      {#if !!$snapshot.context.commandHistory?.length}
        <div class="flex flex-col gap-y-2">
          {#each $snapshot.context.commandHistory as { text, timestamp, output }}
            <div transition:slide={{ duration: 300 }} class="flex flex-col">
              <div class="flex justify-between gap-x-2">
                <Prompt />
                <div class="w-fit flex-1 flex-wrap break-words">
                  {text}
                </div>
                <span class="text-xs text-green-300">
                  {formatDate(timestamp)}
                </span>
              </div>

              <p class="flex text-sm">
                <ChevronRight class="pt-1 text-green-300" />
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
        <div class="relative flex-1">
          {#if !!activeSuggestedCommand}
            <div transition:slide class="absolute left-0 top-0 opacity-50">
              {activeSuggestedCommand}
            </div>
          {/if}
          <span
            bind:this={inputEl}
            on:keyup={keyPressAction}
            data-placeholder="Type help to get started."
            class="block h-fit resize-y overflow-hidden border-none bg-transparent outline-none"
            role="textbox"
            contenteditable />
        </div>
      </div>
    </div>
  {/if}
</aside>
