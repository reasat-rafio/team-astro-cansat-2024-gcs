<script lang="ts">
  import { fade } from 'svelte/transition';
  import { ChevronRight } from 'lucide-svelte';
  export let formatKey: string;
  export let value: string;
  export let color: 'default' | 'error' = 'default';
</script>

<li class="flex items-center space-x-3">
  <ChevronRight class="stroke-primary" size={20} />
  <span>
    {formatKey}:{' '}
    {#key value}
      <span
        class:text-primary={color === 'default'}
        class:text-red-600={color === 'error'}
        in:fade={{ duration: 400 }}
        class="font-semibold capitalize">
        {value}
      </span>
    {/key}
  </span>
</li>
