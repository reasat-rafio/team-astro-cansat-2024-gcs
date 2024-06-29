<script lang="ts">
  import commandHistoryStore from '@/stores/command.history.store';
  import terminalStore from '@/stores/terminal/terminal.store';
  import { uiStore } from '@/stores/ui.store';
  import Prompt from './Prompt.svelte';

  type KEvent = KeyboardEvent & {
    currentTarget: EventTarget & HTMLSpanElement;
  };

  function keyPressAction(e: KEvent) {
    submitCommand(e);
  }

  function submitCommand(e: KEvent) {
    if (e.currentTarget && e.key === 'Enter') {
      e.preventDefault();
      // const cmdParts = e.currentTarget.innerText.trim().split(',');

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
    <span
      bind:this={$uiStore.terminalInputEl}
      on:keyup={keyPressAction}
      data-placeholder="Type help to get started."
      class="block h-fit resize-y overflow-hidden border-none bg-transparent outline-none"
      role="textbox"
      contenteditable={!lastCommandIsPending} />
  </div>
</div>
