<script lang="ts">
  import { page } from '$app/stores';
  import HomeIcon from '../icons/HomeIcon.svelte';
  import VisualIcon from '../icons/VisualIcon.svelte';
  import { navbarHeight } from '@/stores/ui.store.';
  import { onMount } from 'svelte';
  import Csv from './CSV.svelte';
  import Button from '@/components/ui/button/button.svelte';

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

<div class="flex bg-gray-900 px-4 py-2" bind:clientHeight={$navbarHeight}>
  <ul class="flex flex-1 space-x-2">
    {#each navItems as { icon, name, url }}
      <li>
        <Button
          class="flex gap-2"
          variant={$page.url.pathname === url ? 'secondary' : 'outline'}
          href={url}>
          <span>{name}</span>
          <svelte:component this={icon} />
        </Button>
      </li>
    {/each}
  </ul>
  <Csv />
</div>
