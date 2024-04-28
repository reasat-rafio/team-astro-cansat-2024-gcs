<script lang="ts">
  import { uiStore } from '@/stores/ui.store.';
  import CsvButtons from './CsvButtons.svelte';
  import Button from '@/components/ui/button/button.svelte';
  import { Home, Activity } from 'lucide-svelte';
  import ThemeSwitcher from '../ThemeSwitcher.svelte';
  import Sidebar from './Sidebar.svelte';

  const navItems = [
    { name: 'Home', icon: Home, url: '/' },
    { name: 'Data Visualization', icon: Activity, url: '/visualization' },
  ];
</script>

<nav
  class="sticky left-0 top-0 z-50 flex px-4 py-2"
  bind:clientHeight={$uiStore.navbarHeight}>
  <ul class="flex flex-1 space-x-2">
    {#each navItems as { icon, name, url }}
      <li>
        <Button class="flex gap-2 text-white" href={url}>
          <span>{name}</span>
          <svelte:component this={icon} size={18} />
        </Button>
      </li>
    {/each}
  </ul>

  <div class="flex space-x-2">
    <CsvButtons />
    <ThemeSwitcher />
    <Sidebar />
  </div>
</nav>
