<script lang="ts">
  import * as Select from '@/components/ui/select';
  import { validCommands } from '@/lib/helper';
  import terminalStore from '@/stores/terminal.store';

  let selectedCmd: string | null = null;

  $: if (selectedCmd) {
    terminalStore.setCurrentCommand({ value: selectedCmd, time: new Date() });
  }
</script>

<Select.Root
  onSelectedChange={(currCmd) => {
    if (currCmd) selectedCmd = String(currCmd?.value);
  }}>
  <Select.Trigger class="w-[300px] text-white">
    <Select.Value placeholder="Commands" />
  </Select.Trigger>
  <Select.Content>
    {#each Object.keys(validCommands) as cmd}
      <Select.Item value={cmd}>{cmd}</Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
