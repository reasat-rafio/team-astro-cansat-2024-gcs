<script lang="ts">
  import Navbar from '@/components/navbar/Navbar.svelte';
  import Terminal from '@/components/terminal/Terminal.svelte';
  import terminalStore, { cmdAction } from '@/stores/terminal.store';
  import { Toaster } from '@/components/ui/sonner';
  import { onMount } from 'svelte';
  import '../app.css';
  import mqttHandler from '@/lib/mqtt';
  import { theme } from '@/stores/ui.store.';

  onMount(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = '';
      return 'Are you sure you want to leave? You are in the middle of something.';
    }

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  });

  $: if ($terminalStore) {
    cmdAction($terminalStore.currentCommand?.value as string);
  }

  onMount(() => {
    mqttHandler.client.subscribe('test');
  });

  $: if ($theme === 'dark') {
    document.body.classList.add('dark');
  } else if ($theme === 'light') {
    document.body.classList.remove('dark');
  }
</script>

<svelte:head>
  <html lang="en" />
  <title>CANSAT GCS</title>
</svelte:head>

<Toaster richColors closeButton />
<Navbar />
<slot />
<Terminal />
