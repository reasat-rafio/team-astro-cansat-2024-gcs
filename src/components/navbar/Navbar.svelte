<script lang="ts">
  import { uiStore } from '@/stores/ui.store';
  import CsvImport from './CsvImport.svelte';
  import Button from '@/components/ui/button/button.svelte';
  import { ScrollTextIcon, Home, Activity, BatteryFull } from 'lucide-svelte';
  import ThemeSwitcher from '../ThemeSwitcher.svelte';
  import Sidebar from './Sidebar.svelte';
  import CsvExport from './CsvExport.svelte';
  import { page } from '$app/stores';
  import { cn } from '@/utils';
  import Clock from './Clock.svelte';

  $: activeRoute = $page.url.pathname;
  const navItems = [
    { name: 'Home', icon: Home, url: '/' },
    { name: 'Data Visualization', icon: Activity, url: '/visualization' },
    { name: 'Logs', icon: ScrollTextIcon, url: '/logs' },
  ];
</script>

<nav
  class="sticky left-0 top-0 z-50 flex bg-background px-4 py-2"
  bind:clientHeight={$uiStore.navbarHeight}>
  <ul class="flex flex-1 space-x-2">
    {#each navItems as { icon, name, url }}
      <li>
        <Button
          variant="outline"
          class={cn('flex gap-2', {
            'bg-primary text-white': activeRoute === url,
          })}
          href={url}>
          <span>{name}</span>
          <svelte:component this={icon} size={18} />
        </Button>
      </li>
    {/each}
  </ul>

  <div class="flex space-x-2">
    <Clock />
    <Button
      variant="ghost"
      class="pointer-events-none space-x-2 text-green-600">
      <BatteryFull />
      <span>90%</span>
    </Button>
    <CsvImport />
    <CsvExport />
    <ThemeSwitcher />
    <Sidebar />
  </div>
</nav>
