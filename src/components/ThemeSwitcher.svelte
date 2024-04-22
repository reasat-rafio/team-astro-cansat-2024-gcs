<script lang="ts">
  import * as Select from '@/components/ui/select/index.js';
  import { MoonStar } from 'lucide-svelte';
  import Button from './ui/button/button.svelte';

  const modes = [
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
  ];
</script>

<Select.Root portal={null}>
  <Select.Trigger hideIcon class="w-auto border-none bg-transparent px-0">
    <Button variant="outline">
      <MoonStar size={18} />
    </Button>
  </Select.Trigger>

  <Select.Content>
    <Select.Group>
      {#each modes as mode}
        <Select.Item class="px-0" value={mode.value} label={mode.label}>
          {mode.label}
        </Select.Item>
      {/each}
    </Select.Group>
  </Select.Content>
  <Select.Input name="favoriteFruit" />
</Select.Root>
