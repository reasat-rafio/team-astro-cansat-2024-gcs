<script lang="ts">
  import Navbar from '@/components/navbar/Navbar.svelte';
  import Terminal from '@/components/terminal/Terminal.svelte';
  import type { TerminalContext } from '@/lib/@types/app.types';
  import csvProcessingMachine from '@/machines/csv-machine';
  import gcsMachine from '@/machines/gcs-machine';
  import terminalMachine from '@/machines/terminal-machine';
  import csvStore from '@/stores/csv.store';
  import gcsStore from '@/stores/gcs.store';
  import terminalStore from '@/stores/terminal.store';
  import { AppShell } from '@skeletonlabs/skeleton';
  import { useActor } from '@xstate/svelte';
  import { onMount } from 'svelte';
  import type { Snapshot } from 'xstate';
  import '../app.css';

  const gcsService = useActor(gcsMachine);
  const csvService = useActor(csvProcessingMachine);
  const terminalService = useActor(terminalMachine, {
    snapshot: JSON.parse(
      localStorage?.getItem('terminal_persisted_state') as string,
    ) as Snapshot<TerminalContext>,
  });

  gcsStore.setStore(gcsService);
  terminalStore.setStore(terminalService);
  csvStore.setStore(csvService);

  onMount(() => {
    // LOGGER
    const gcsSub = $gcsStore.actorRef.subscribe((state) => {
      console.log({ gcs: state });
    });
    const terminalSub = $terminalStore.actorRef.subscribe((state) => {
      console.log({ terminal: state });
    });
    const csvSub = $csvStore.actorRef.subscribe((state) => {
      console.log({ csv: state });
    });

    return () => {
      gcsSub.unsubscribe();
      terminalSub.unsubscribe();
      csvSub.unsubscribe();
    };
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
