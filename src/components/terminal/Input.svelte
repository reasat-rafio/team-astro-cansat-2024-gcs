<script lang="ts">
  import { validCommands } from '@/lib/helper';
  import Prompt from './Prompt.svelte';
  import terminalStore from '@/stores/terminal.store';
  import commandHistoryStore from '@/stores/command.history.store';

  export let inputEl: HTMLSpanElement;
  export let activeSuggestedCommand: string | null = null;

  let suggestedCommands: string[] | null = null;
  let activeSuggestedCommandIndex = 0;

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
      terminalStore.setCurrentCommand({
        value: e.currentTarget.innerText.trim(),
        time: new Date(),
      });
      e.currentTarget.innerText = '';
    }
  }

  $: lastCommand = $commandHistoryStore.commandHistory?.slice(-1)[0];
  $: lastCommandIsPending = lastCommand?.status === 'pending' ?? false;
</script>

<div class="flex gap-x-2">
  {#if !lastCommandIsPending}
    <Prompt />
  {/if}

  <!-- svelte-ignore a11y-interactive-supports-focus -->
  <div class="relative flex-1">
    {#if !!activeSuggestedCommand}
      <div class="absolute left-0 top-0 opacity-20">
        {activeSuggestedCommand}
      </div>
    {/if}
    <span
      bind:this={inputEl}
      on:keyup={keyPressAction}
      data-placeholder="Type help to get started."
      class="block h-fit resize-y overflow-hidden border-none bg-transparent outline-none"
      role="textbox"
      contenteditable={!lastCommandIsPending} />
  </div>
</div>
