<script>
  import '../app.css';

  import { AppShell } from '@skeletonlabs/skeleton';
  import Navbar from '@components/Navbar.svelte';
</script>

<AppShell>
  <svelte:fragment slot="header">
    <Navbar />
  </svelte:fragment>
  <slot />
</AppShell>
