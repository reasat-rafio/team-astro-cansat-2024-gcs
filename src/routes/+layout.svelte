<script lang="ts">
  import Navbar from '@/components/navbar/Navbar.svelte';
  import Terminal from '@/components/terminal/Terminal.svelte';
  import { Toaster } from '@/components/ui/sonner';
  import { onMount } from 'svelte';
  import '../app.css';
  import mqttHandler from '@/lib/mqtt';
  import { uiStore } from '@/stores/ui.store';

  async function detectSWUpdate() {
    const registration = await navigator.serviceWorker.ready;

    registration.addEventListener('updatefound', () => {
      const newSw = registration.installing;
      newSw?.addEventListener('statechange', () => {
        if (newSw?.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            if (confirm('New version available. Reload to update?')) {
              newSw.postMessage({ type: 'SKIP_WAITING' });
              window.location.reload();
            }
          }
        }
      });
    });
  }

  onMount(() => {
    detectSWUpdate();
  });

  onMount(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = '';
      return 'Are you sure you want to leave? You are in the middle of something.';
    }

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  });

  onMount(() => {
    mqttHandler.client.subscribe('telemetry/data');
    mqttHandler.client.subscribe('ground_station/commands_response');
  });
</script>

<svelte:head>
  <title>Team Astro</title>
</svelte:head>

<Toaster
  class={!$uiStore.showNotification ? 'hidden' : ''}
  richColors
  closeButton
  position="bottom-left" />

<Navbar />
<slot />
<Terminal />
