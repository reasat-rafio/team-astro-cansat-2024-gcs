<script lang="ts">
  import '../app.css';

  import Navbar from '@/components/Navbar.svelte';
  import Terminal from '@/components/terminal/Terminal.svelte';
  import { AppShell } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';

  onMount(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = '';
      return 'Are you sure you want to leave? You are in the middle of something.';
    }

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  });
</script>

<svelte:head>
  <title>CANSAT GCS</title>
  <html lang="en" />
</svelte:head>
<AppShell>
  <svelte:fragment slot="header">
    <Navbar />
  </svelte:fragment>
  <slot />
  <Terminal />
</AppShell>
