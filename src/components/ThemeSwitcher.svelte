<script lang="ts">
  import * as Select from '@/components/ui/select/index.js';
  import { uiStore } from '@/stores/ui.store.';
  import { MoonStar, Sun } from 'lucide-svelte';

  const modes = [
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
  ];
</script>

<Select.Root
  selected={{
    label: $uiStore.theme.toLocaleLowerCase(),
    value: $uiStore.theme,
  }}
  onSelectedChange={(v) => {
    if (v) uiStore.setTheme(v.value);
  }}>
  <Select.Trigger
    hideIcon
    class="flex w-16 items-center justify-center  bg-transparent ">
    <button>
      {#if $uiStore.theme === 'dark'}
        <MoonStar size={18} />
      {:else}
        <Sun size={18} />
      {/if}
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
