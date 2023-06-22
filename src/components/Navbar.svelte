<script lang="ts">
  import { AppBar } from '@skeletonlabs/skeleton';
  import VisualIcon from '@components/icons/VisualIcon.svelte';
  import HomeIcon from '@components/icons/HomeIcon.svelte';
  import { navbarHeight } from '@stores/ui.store.';
  import { page } from '$app/stores';

  const navItems = [
    { name: 'Home', icon: HomeIcon, url: '/' },
    { name: 'Data Visualization', icon: VisualIcon, url: '/visualization' }
  ];
</script>

<div bind:clientHeight={$navbarHeight}>
  <AppBar>
    <svelte:fragment slot="lead">Cansat 2024</svelte:fragment>
    <svelte:fragment slot="trail">
      <ul class="flex space-x-2">
        {#each navItems as { icon, name, url }}
          <li>
            <a
              class="btn {$page.url.pathname === url
                ? 'variant-ghost-primary'
                : 'hover:variant-ghost'}"
              href={url}
            >
              <span>{name}</span>
              <svelte:component this={icon} />
            </a>
          </li>
        {/each}
      </ul>
    </svelte:fragment>
  </AppBar>
</div>
