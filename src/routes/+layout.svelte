<script>
  import '../app.css';

  import { AppShell } from '@skeletonlabs/skeleton';
  import Navbar from '@/components/Navbar.svelte';
  import Terminal from '@/components/terminal/Terminal.svelte';
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
