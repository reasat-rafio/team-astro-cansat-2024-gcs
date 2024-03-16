<script lang="ts">
  import Navbar from '@/components/navbar/Navbar.svelte';
  import Terminal from '@/components/terminal/Terminal.svelte';
  import { onMount } from 'svelte';
  import '../app.css';

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
  <html lang="en" />
  <title>CANSAT GCS</title>
</svelte:head>

<Navbar />
<slot />
<Terminal />
