<script lang="ts">
  import csvStore from '@/stores/csv.temp.store';
  import systemStepsStore from '@/stores/system.steps.store';
  import Papa from 'papaparse';
  import { onDestroy } from 'svelte';
  import DownloadIcon from '../icons/DownloadIcon.svelte';
  import ImportIcon from '../icons/ImportIcon.svelte';
  import Button from '../ui/button/button.svelte';

  let importCSVEl: HTMLInputElement;
  let intervalId: NodeJS.Timeout | null = null;
  let currentIndex = 1;

  $: ({ rawData } = $csvStore);

  const processLine = () => {
    if (currentIndex < rawData.length) {
      const currentLine = rawData[currentIndex];
      const headerRow = rawData[0];

      headerRow.forEach((columnName, index) => {
        csvStore.setActiveStream({
          key: columnName,
          value: currentLine[index],
        });
      });

      csvStore.updateCsvStreams(currentLine.join(','));

      console.log('Processing line:', $csvStore.activeStreamObj);
      currentIndex++;
    } else {
      clearInterval(intervalId!);
      intervalId = null;
      csvStore.setState('completed');
      console.log('Processing complete');
    }
  };

  function handleCSVUpload() {
    if (!importCSVEl?.files?.length) return;

    Papa.parse(importCSVEl.files[0], {
      skipEmptyLines: true,
      complete: function (results) {
        csvStore.setState('running');
        systemStepsStore.setImportCsvStatus('done');
        csvStore.setCsvFileRawData(results.data as string[][]);
      },
      error(error, file) {
        systemStepsStore.setImportCsvStatus('error');
        console.error('Error parsing CSV:', error, file);
      },
    });
  }

  onDestroy(() => {
    clearInterval(intervalId!);
  });
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
