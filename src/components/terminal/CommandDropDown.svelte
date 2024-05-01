<script lang="ts">
  import * as Select from '@/components/ui/select';
  // import { validCommands } from '@/lib/helpers/valid-terminal-commands';
  import terminalStore from '@/stores/terminal/terminal.store';
  import validTerminalCommandStoreStore from '@/stores/terminal/valid-terminal-command.sore';

  let selectedCmd: string | null = null;

  $: if (selectedCmd) {
    terminalStore.setCurrentCommand({ value: selectedCmd, time: new Date() });
  }
</script>

<Select.Root
  onSelectedChange={(currCmd) => {
    if (currCmd) selectedCmd = String(currCmd?.value);
  }}>
  <Select.Trigger class="w-[300px] ">
    <Select.Value placeholder="Commands" />
  </Select.Trigger>
  <Select.Content>
    {#each $validTerminalCommandStoreStore as { cmd }}
      <Select.Item
        on:click={(currCmd) => {
          if (currCmd) selectedCmd = String(currCmd);
        }}
        class="cursor-pointer"
        value={cmd}>
        {cmd}
      </Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
