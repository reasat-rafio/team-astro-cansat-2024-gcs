<script lang="ts">
  import * as Select from '@/components/ui/select';
  // import { validCommands } from '@/lib/helpers/valid-terminal-commands';
  import terminalStore from '@/stores/terminal/terminal.store';
  import validTerminalCommandStoreStore from '@/stores/terminal/valid-terminal-command.sore';

  type SelectedCmd = { value: { cmd: string; id: string } };
  let selectedCmd: SelectedCmd;

  $: if (selectedCmd) {
    terminalStore.setCurrentCommand({
      id: selectedCmd.value.id,
      value: selectedCmd.value.cmd,
      time: new Date(),
    });
  }
</script>

<Select.Root
  bind:selected={selectedCmd}
  onSelectedChange={(currCmd) => {
    if (currCmd) selectedCmd = currCmd;
  }}>
  <Select.Trigger class="w-[300px] ">
    <Select.Value placeholder="Commands" />
  </Select.Trigger>
  <Select.Content>
    {#each $validTerminalCommandStoreStore as { cmd, id }}
      <Select.Item class="cursor-pointer" value={{ cmd, id }}>
        {cmd}
      </Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
