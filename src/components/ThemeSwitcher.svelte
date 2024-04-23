<script lang="ts">
  import * as Select from '@/components/ui/select/index.js';
  import { theme } from '@/stores/ui.store.';
  import { MoonStar } from 'lucide-svelte';

  const modes = [
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
  ];
</script>

<Select.Root
  selected={{ label: $theme.toLocaleLowerCase(), value: $theme }}
  onSelectedChange={(v) => {
    if (v) theme.set(v.value);
  }}>
  <Select.Trigger
    hideIcon
    class="flex w-16 items-center justify-center  bg-transparent ">
    <button>
      <MoonStar size={18} />
    </button>
  </Select.Trigger>

  <Select.Content>
    <Select.Group>
      {#each modes as mode}
        <Select.Item
          hideIcon
          class="m-0 px-0"
          value={mode.value}
          label={mode.label}>
          {mode.label}
        </Select.Item>
      {/each}
    </Select.Group>
  </Select.Content>
  <Select.Input name="favoriteFruit" />
</Select.Root>
