<script lang="ts">
  import HomeIcon from '../icons/HomeIcon.svelte';
  import VisualIcon from '../icons/VisualIcon.svelte';
  import { navbarHeight } from '@/stores/ui.store.';
  import Csv from './CSV.svelte';
  import Button from '@/components/ui/button/button.svelte';

  const navItems = [
    { name: 'Home', icon: HomeIcon, url: '/' },
    { name: 'Data Visualization', icon: VisualIcon, url: '/visualization' },
  ];
</script>

<nav
  class="sticky left-0 top-0 z-50 flex bg-white px-4 py-2"
  bind:clientHeight={$navbarHeight}>
  <ul class="flex flex-1 space-x-2">
    {#each navItems as { icon, name, url }}
      <li>
        <Button class="flex gap-2 text-white" href={url}>
          <span>{name}</span>
          <svelte:component this={icon} />
        </Button>
      </li>
    {/each}
  </ul>
  <Csv />
</nav>
