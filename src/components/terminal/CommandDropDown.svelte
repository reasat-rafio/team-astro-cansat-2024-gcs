<script lang="ts">
  import * as Select from '@/components/ui/select';
  import { validCommands } from '@/lib/helper';
  import terminalStore from '@/stores/terminal.temp.store';

  let selectedCmd: string | null = null;

  $: if (selectedCmd) {
    terminalStore.setCurrentCommand({ value: selectedCmd, time: new Date() });
  }

  //   $: {
  //     console.log(selectedCmd);
  //   }
</script>

<Select.Root
  onSelectedChange={(v) => {
    if (v) selectedCmd = String(v?.value);
  }}>
  <Select.Trigger class="w-[300px] ">
    <Select.Value placeholder="Commands" />
  </Select.Trigger>
  <Select.Content>
    {#each Object.keys(validCommands) as cmd}
      <Select.Item value={cmd}>{cmd}</Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
