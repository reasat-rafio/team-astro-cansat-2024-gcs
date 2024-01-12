<script lang="ts">
  import { validCommands } from '@/lib/helper';
  import Prompt from './Prompt.svelte';
  import type { TerminalActorContext } from '@/lib/@types/app.types';
  import { getContext } from 'svelte';
  import terminalStore from '@/stores/terminal.store';

  export let inputEl: HTMLSpanElement;
  export let activeSuggestedCommand: string | null = null;

  let suggestedCommands: string[] | null = null;
  let activeSuggestedCommandIndex = 0;
  const { send } = $terminalStore;

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

<div class="flex gap-x-2">
  <Prompt />

  <!-- svelte-ignore a11y-interactive-supports-focus -->
  <div class="relative flex-1">
    {#if !!activeSuggestedCommand}
      <div class="absolute left-0 top-0 opacity-50">
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
