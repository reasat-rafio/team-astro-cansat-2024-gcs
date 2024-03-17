<script lang="ts">
  import csvStore from '@/stores/csv.store';
  import systemStepsStore from '@/stores/system.steps.store';
  import Papa from 'papaparse';
  import DownloadIcon from '../icons/DownloadIcon.svelte';
  import ImportIcon from '../icons/ImportIcon.svelte';
  import Button from '../ui/button/button.svelte';

  let importCSVEl: HTMLInputElement;

  function handleCSVUpload() {
    if (!importCSVEl?.files?.length) return;

    Papa.parse(importCSVEl.files[0], {
      skipEmptyLines: true,
      complete: function (results) {
        csvStore.setState('ready');
        systemStepsStore.setImportCsvStatus('done');
        csvStore.setCsvFileRawData(results.data as string[][]);
      },
      error(error, file) {
        systemStepsStore.setImportCsvStatus('error');
        console.error('Error parsing CSV:', error, file);
      },
    });
  }
</script>

<div class="flex space-x-2">
  <Button
    on:click={() => importCSVEl.click()}
    class="flex gap-2"
    variant="destructive">
    <span>Import CSV</span>
    <ImportIcon />
  </Button>

  <Button class="flex gap-2" variant="outline">
    <span>Export CSV</span>
    <DownloadIcon />
  </Button>
</div>

<input
  class="hidden"
  bind:this={importCSVEl}
  on:change={handleCSVUpload}
  type="file"
  name="importCSV"
  accept=".csv" />
