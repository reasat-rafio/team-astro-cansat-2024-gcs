<script lang="ts">
  import { AppBar } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';
  import HomeIcon from './icons/HomeIcon.svelte';
  import VisualIcon from './icons/VisualIcon.svelte';
  import { navbarHeight } from '@/stores/ui.store.';

  const navItems = [
    { name: 'Home', icon: HomeIcon, url: '/' },
    { name: 'Data Visualization', icon: VisualIcon, url: '/visualization' }
  ];
</script>

<div bind:clientHeight={$navbarHeight}>
  <AppBar>
    <svelte:fragment slot="lead">
      <ul class="flex space-x-2">
        {#each navItems as { icon, name, url }}
          <li>
            <a
              class="btn variant-ghost hover:variant-filled-secondary {$page.url
                .pathname === url && '!variant-filled-secondary'}"
              href={url}
            >
              <span>{name}</span>
              <svelte:component this={icon} />
            </a>
          </li>
        {/each}
      </ul>
    </svelte:fragment>
    <svelte:fragment slot="trail">
      <button
        class="btn variant-outline-secondary hover:variant-filled-secondary"
        ><span>Export CSV</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      </button>
    </svelte:fragment>
  </AppBar>
</div>
