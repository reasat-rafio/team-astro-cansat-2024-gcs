<script lang="ts">
  import ChevronRight from '@/components/icons/ChevronRight.svelte';
  import { fade } from 'svelte/transition';

  export let formatKey: string;
  export let value: string;
  export let color: 'default' | 'error' = 'default';
</script>

<li class="flex items-center space-x-3">
  <ChevronRight color="green" size={18} />
  <span>
    {formatKey}:{' '}
    {#key value}
      <span
        class:text-primary={color === 'default'}
        class:text-red-600={color === 'error'}
        in:fade={{ duration: 150 }}
        class="font-semibold capitalize">
        {value}
      </span>
    {/key}
  </span>
</li>
