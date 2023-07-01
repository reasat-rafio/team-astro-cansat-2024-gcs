<script lang="ts">
  import H4 from '@components/ui/H4.svelte';
  export let icon: ConstructorOfATypedSvelteComponent;
  export let title: string;
</script>

<header class="flex space-x-3 text-primary-500">
  <svelte:component this={icon} />
  <H4>{title}</H4>
</header>
