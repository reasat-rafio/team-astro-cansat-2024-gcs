<script lang="ts">
  import '../app.css';
  import Navbar from '@/components/navbar/Navbar.svelte';
  import Terminal from '@/components/terminal/Terminal.svelte';
  import type { TerminalContext } from '@/lib/@types/app.types';
  import gcsMachine from '@/machines/gcs-machine';
  import terminalMachine from '@/machines/terminal-machine';
  import { AppShell } from '@skeletonlabs/skeleton';
  import { useActor } from '@xstate/svelte';
  import { onMount, setContext } from 'svelte';
  import type { Snapshot } from 'xstate';

  const gcsService = useActor(gcsMachine);
  const terminalService = useActor(terminalMachine, {
    snapshot: JSON.parse(
      localStorage?.getItem('terminal_persisted_state') as string,
    ) as Snapshot<TerminalContext>,
  });

  setContext('terminalService', terminalService);
  setContext('gcsService', gcsService);

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
    const storeRef = terminalService.actorRef.subscribe(() => {
      const persistedState = terminalService.actorRef.getPersistedSnapshot();
      localStorage.setItem(
        'terminal_persisted_state',
        JSON.stringify(persistedState),
      );
    });

    return () => storeRef.unsubscribe();
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
