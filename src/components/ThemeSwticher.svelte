<script lang="ts">
  import * as Select from '@/components/ui/select/index.js';

  const modes = [
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
  ];
</script>

<Select.Root portal={null}>
  <Select.Trigger class="w-[180px]">
    <Select.Value placeholder="Select a fruit" />
  </Select.Trigger>
  <Select.Content>
    <Select.Group>
      <Select.Label>Fruits</Select.Label>
      {#each modes as mode}
        <Select.Item value={mode.value} label={mode.label}>
          {mode.label}
        </Select.Item>
      {/each}
    </Select.Group>
  </Select.Content>
  <Select.Input name="favoriteFruit" />
</Select.Root>
