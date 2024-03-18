import commandHistoryStore, {
  lastCommand,
} from '@/stores/command.history.store';
import csvStore, { activeStreamObj } from '@/stores/csv.store';
import { getCurrentSuccessOutput } from '@/stores/terminal.store';
import { onDestroy } from 'svelte';
import { toast } from 'svelte-sonner';
import { get } from 'svelte/store';
import type { CSV_HEAD } from '../@types/app.types';

let currentIndex = 1;
let intervalId: NodeJS.Timeout;

const processLine = (csvData: string[][], headerRow: CSV_HEAD[]) => {
  if (currentIndex < csvData.length) {
    const currentLine = csvData[currentIndex];

    csvStore.setSteamObj(currentLine, headerRow);

    csvStore.updateCsvStreams(currentLine.join(','));

    console.log('Processing line:', get(activeStreamObj));
    currentIndex++;
  } else {
    csvStore.setState('completed');
    commandHistoryStore.setLatestCommandOutput(getCurrentSuccessOutput());
    commandHistoryStore.updateLastCommandStatus('success');
    console.log('Processing complete');
    clearInterval(intervalId);
  }
};

export default function CMD_2043_SIM_ACTIVATE() {
  if (get(csvStore).state === 'idle') {
    toast.error('No CSV file loaded');
    commandHistoryStore.setLatestCommandOutput('No CSV file loaded');
    commandHistoryStore.updateLastCommandStatus('error');
    return;
  }

  if (intervalId) clearInterval(intervalId);

  if (get(lastCommand).status === 'pending') {
    csvStore.setState('processing');
    const csvData = get(csvStore).rawData;
    const headerRow = csvData[0] as CSV_HEAD[];

    intervalId = setInterval(() => processLine(csvData, headerRow), 1000);
  }

  onDestroy(() => {
    clearInterval(intervalId);
  });

  return {
    error: null,
  };
}
