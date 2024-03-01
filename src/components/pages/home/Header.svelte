<script lang="ts">
  import H3 from '@/components/ui/H3.svelte';

  export let icon: ConstructorOfATypedSvelteComponent;
  export let title: string;
</script>

<header
  class="sticky top-0 z-10 flex items-center space-x-3 bg-background pb-3">
  <svelte:component this={icon} />
  <H3 class="underline">{title}</H3>
</header>
