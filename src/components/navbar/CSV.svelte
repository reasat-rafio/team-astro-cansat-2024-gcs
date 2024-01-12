<script lang="ts">
  import DownloadIcon from '../icons/DownloadIcon.svelte';
  import Papa from 'papaparse';
  import ImportIcon from '../icons/ImportIcon.svelte';
  import { onDestroy } from 'svelte';
  import gcsStore from '@/stores/gcs.store';

  let importCSVEl: HTMLInputElement;
  let csvData: string[][][] = [];
  let currentIndex = 1;
  let intervalId: NodeJS.Timeout | null = null;
  const { send } = $gcsStore;

  const processLine = () => {
    if (currentIndex < csvData.length) {
      const currentLine = csvData[currentIndex];
      const headerRow = csvData[0];

      const lineObject = {};
      headerRow.forEach((columnName, index) => {
        // TODO: Add type checking
        lineObject[columnName] = currentLine[index];
      });

      console.log('Processing line:', lineObject);
      currentIndex++;
    } else {
      clearInterval(intervalId!);
      intervalId = null;
      console.log('Processing complete');
    }
  };

  function handleCSVUpload() {
    if (!importCSVEl?.files?.length) return;

    Papa.parse(importCSVEl.files[0], {
      skipEmptyLines: true,
      complete: function (results) {
        csvData = results.data as string[][][];
        intervalId = setInterval(processLine, 1000);
      },
    });
  }

  onDestroy(() => {
    clearInterval(intervalId!);
  });
</script>

<button
  on:click={() => importCSVEl.click()}
  class="variant-outline-secondary btn hover:variant-filled-secondary">
  <span>Import CSV</span>
  <ImportIcon />
</button>

<button class="variant-outline-secondary btn hover:variant-filled-secondary">
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
