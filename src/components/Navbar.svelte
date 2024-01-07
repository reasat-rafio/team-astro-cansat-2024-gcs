<script lang="ts">
  import { AppBar } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';
  import HomeIcon from './icons/HomeIcon.svelte';
  import VisualIcon from './icons/VisualIcon.svelte';
  import { navbarHeight } from '@/stores/ui.store.';
  import DownloadIcon from './icons/DownloadIcon.svelte';
  import ImportIcon from './icons/ImportIcon.svelte';
  import { onMount } from 'svelte';
  import Papa from 'papaparse';

  let importCSVEl: HTMLInputElement;
  const navItems = [
    { name: 'Home', icon: HomeIcon, url: '/' },
    { name: 'Data Visualization', icon: VisualIcon, url: '/visualization' },
  ];

  function handleCSVUpload() {
    if (!importCSVEl?.files?.length) return;

    Papa.parse(importCSVEl.files[0], {
      complete: function (results) {
        console.log('Finished:', results.data);
      },
    });
  }

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
      <button
        on:click={() => importCSVEl.click()}
        class="variant-outline-secondary btn hover:variant-filled-secondary">
        <span>Import CSV</span>
        <ImportIcon />
      </button>
      <button
        class="variant-outline-secondary btn hover:variant-filled-secondary">
        <span>Export CSV</span>
        <DownloadIcon />
      </button>

      <input
        class="hidden"
        bind:this={importCSVEl}
        on:change={handleCSVUpload}
        type="file"
        name="importCSV"
        accept=".csv" />
    </svelte:fragment>
  </AppBar>
</div>
