<script lang="ts">
  import { AppBar } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';
  import HomeIcon from '../icons/HomeIcon.svelte';
  import VisualIcon from '../icons/VisualIcon.svelte';
  import { navbarHeight } from '@/stores/ui.store.';
  import { onMount } from 'svelte';
  import Csv from './CSV.svelte';

  const navItems = [
    { name: 'Home', icon: HomeIcon, url: '/' },
    { name: 'Data Visualization', icon: VisualIcon, url: '/visualization' },
  ];

  onMount(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = '';
      return 'Are you sure you want to leave? You are in the middle of something.';
    }

    window.addEventListener('beforeunload', handleBeforeUnload);
  });
</script>

<div bind:clientHeight={$navbarHeight}>
  <AppBar>
    <svelte:fragment slot="lead">
      <ul class="flex space-x-2">
        {#each navItems as { icon, name, url }}
          <li>
            <a
              class="variant-ghost btn hover:variant-filled-secondary {$page.url
                .pathname === url && '!variant-filled-secondary'}"
              href={url}>
              <span>{name}</span>
              <svelte:component this={icon} />
            </a>
          </li>
        {/each}
      </ul>
    </svelte:fragment>
    <svelte:fragment slot="trail">
      <Csv />
    </svelte:fragment>
  </AppBar>
</div>
