import type {
  CSV_HEAD,
  TerminalCommand,
  TerminalType,
} from '@/lib/@types/app.types';
import commandHistoryStore, {
  lastCommand,
} from '@/stores/command.history.store';
import csvStore from '@/stores/csv.store';
import { addLog } from '@/stores/log.store';
import getSuccessOutput from '@/stores/terminal/helpers/get-current-success-output';
import updateCommandHistory from '@/stores/terminal/helpers/update-command-history';
import { onDestroy } from 'svelte';
import { toast } from 'svelte-sonner';
import { get } from 'svelte/store';

let currentIndex = 1;
let intervalId: NodeJS.Timeout;

const processLine = (csvData: string[][], headerRow: CSV_HEAD[]) => {
  if (currentIndex < csvData.length) {
    const currentLine = csvData[currentIndex];

    csvStore.setSteamObj(currentLine, headerRow);
    csvStore.updateCsvStreams(currentLine.join(','));

    currentIndex++;
  } else {
    csvStore.setState('completed');
    commandHistoryStore.setLatestCommandOutput(getSuccessOutput());
    commandHistoryStore.updateLastCommandStatus('success');
    console.log('Processing complete');
    clearInterval(intervalId);
  }
};

interface Type {
  $state: TerminalType;
  command: TerminalCommand;
}
export default function CMD_2043_SIM_ACTIVATE({ $state, command }: Type) {
  // if (get(csvStore).state === 'idle') {
  //   toast.error('No CSV file loaded');
  //   commandHistoryStore.setLatestCommandOutput('No CSV file loaded');
  //   commandHistoryStore.updateLastCommandStatus('error');
  //   return;
  // }

  // if (intervalId) clearInterval(intervalId);

  // if (get(lastCommand).status === 'pending') {
  //   csvStore.setState('processing');
  //   const csvData = get(csvStore).rawData;
  //   const headerRow = csvData[0] as CSV_HEAD[];

  //   intervalId = setInterval(() => processLine(csvData, headerRow), 1000);
  // }

  // onDestroy(() => {
  //   clearInterval(intervalId);
  // });
  try {
    const successMessage = getSuccessOutput(command.value);

    addLog({
      value: `${command.value} executed successfully. ${successMessage}.`,
      time: command.time,
    });

    return updateCommandHistory({
      $state,
      command,
      status: 'success',
      output: `<p class="text-green-600">${command.value} executed successfully. ${successMessage}.</p>`,
    });
  } catch (error) {
    addLog({ value: `Error: ${error}`, time: command.time });

    return updateCommandHistory({
      command,
      $state,
      status: 'error',
      output: `<p class="text-destructive">Error: ${error}</p>`,
    });
  }
}
