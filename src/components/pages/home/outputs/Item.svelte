<script lang="ts">
  import TickIcon from '@/components/icons/TickIcon.svelte';
  import { fade } from 'svelte/transition';

  export let formatKey: string;
  export let value: string;
</script>

<li class="flex items-center space-x-3">
  <TickIcon />
  <span>
    {formatKey}:{' '}
    {#key value}
      <span
        in:fade={{ duration: 150 }}
        class="font-semibold capitalize text-white">
        {value}
      </span>
    {/key}
  </span>
</li>
