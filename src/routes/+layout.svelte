<script lang="ts">
  import Navbar from '@/components/navbar/Navbar.svelte';
  import Terminal from '@/components/terminal/Terminal.svelte';
  import { Toaster } from '@/components/ui/sonner';
  import { onMount } from 'svelte';
  import '../app.css';
  import mqttHandler from '@/lib/mqtt';
  import { uiStore } from '@/stores/ui.store';

  // onMount(() => {
  //   function handleBeforeUnload(e: BeforeUnloadEvent) {
  //     e.preventDefault();
  //     e.returnValue = '';
  //     return 'Are you sure you want to leave? You are in the middle of something.';
  //   }

  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  // });

  onMount(() => {
    mqttHandler.client.subscribe('test');
  });
</script>

<svelte:head>
  <html lang="en" />
  <title>CANSAT GCS</title>
</svelte:head>

<Toaster
  class={!$uiStore.showNotification ? 'hidden' : ''}
  richColors
  closeButton
  position="bottom-left" />

<Navbar />
<slot />
<Terminal />
