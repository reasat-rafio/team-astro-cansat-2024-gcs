<script lang="ts">
  import csvStore from '@/stores/csv.store';
  import systemStepsStore from '@/stores/system.steps.store';
  import Papa from 'papaparse';
  import Button from '../ui/button/button.svelte';
  import { toast } from 'svelte-sonner';
  import { Upload } from 'lucide-svelte';

  let importCSVEl: HTMLInputElement;

  function handleCSVUpload() {
    if (!importCSVEl?.files?.length) return;

    Papa.parse(importCSVEl.files[0], {
      skipEmptyLines: true,
      complete: function (results) {
        toast.success('CSV file imported successfully');
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

<Button
  on:click={() => importCSVEl.click()}
  class="flex gap-2 "
  variant="outline">
  <span>Import CSV</span>
  <Upload size={18} />
</Button>

<input
  class="hidden"
  bind:this={importCSVEl}
  on:change={handleCSVUpload}
  type="file"
  name="importCSV"
  accept=".csv" />
