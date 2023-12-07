<script lang="ts">
  import H3 from '@/components/ui/H3.svelte';

  export let icon: ConstructorOfATypedSvelteComponent;
  export let title: string;
</script>

<header
  class="flex space-x-3 text-secondary-500 items-center sticky top-0 bg-surface-900 pb-5 z-10"
>
  <svelte:component this={icon} />
  <H3 class="underline">{title}</H3>
</header>
