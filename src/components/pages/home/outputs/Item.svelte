<script lang="ts">
  import { Check } from 'lucide-svelte';
  import { fade } from 'svelte/transition';

  export let formatKey: string;
  export let value: string;
</script>

<li class="flex items-center space-x-3">
  <Check color="green" size={18} />
  <span>
    {formatKey}:{' '}
    {#key value}
      <span
        in:fade={{ duration: 150 }}
        class="font-semibold capitalize text-primary">
        {value}
      </span>
    {/key}
  </span>
</li>
