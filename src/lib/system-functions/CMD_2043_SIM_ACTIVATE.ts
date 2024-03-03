import commandHistoryStore, {
  lastCommand,
} from '@/stores/command.history.store';
import csvStore from '@/stores/csv.temp.store';
import { getCurrentSuccessOutput } from '@/stores/terminal.temp.store';
import { onDestroy } from 'svelte';
import { get } from 'svelte/store';

let currentIndex = 1;
let intervalId: NodeJS.Timeout;

const processLine = (csvData: string[][]) => {
  if (currentIndex < csvData.length) {
    const currentLine = csvData[currentIndex];
    const headerRow = csvData[0];

    headerRow.forEach((columnName, index) => {
      csvStore.setActiveStream({
        key: columnName,
        value: currentLine[index],
      });
    });

    csvStore.updateCsvStreams(currentLine.join(','));

    console.log('Processing line:', get(csvStore).activeStreamObj);
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
  if (intervalId) clearInterval(intervalId);

  if (get(lastCommand).status === 'pending') {
    const csvData = get(csvStore).rawData;

    intervalId = setInterval(() => processLine(csvData), 1000);
  }

  onDestroy(() => {
    clearInterval(intervalId);
  });

  return {
    error: null,
  };
}
