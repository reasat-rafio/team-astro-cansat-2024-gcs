import type { TerminalCommand, TerminalType } from '@/lib/@types/app.types';
import mqttHandler from '@/lib/mqtt';
import commandHistoryStore from '@/stores/command.history.store';
import csvStore from '@/stores/csv.store';
import { addLog } from '@/stores/log.store';
import systemStepsStore from '@/stores/system.steps.store';
import terminalStore from '@/stores/terminal/terminal.store';
import { uiStore } from '@/stores/ui.store';
import { get } from 'svelte/store';

interface Type {
  $state: TerminalType;
  command: TerminalCommand;
}

let currentIndex = 0;
let intervalId: NodeJS.Timeout;

export default function CMD_2043_SIM_ACTIVATE({ $state, command }: Type) {
  if (get(systemStepsStore).simulationMode.importCSV !== 'done') {
    commandHistoryStore.setCommandHistory({
      ...command,
      output: `<p class="text-red-600">Import CSV file first</p>`,
      status: 'error',
    });
    return {
      ...$state,
      currentCommand: command,
      currentCommandIdx: 0,
    };
  }

  mqttHandler.client.publish('ground_station/commands', 'SIM/ACTIVATE');
  commandHistoryStore.setCommandHistory({
    ...command,
    output: `<p>${command.value} executed successfully. Waiting for response..</p>`,
    status: 'pending',
  });

  addLog({
    value: `${command.value} executed successfully. Waiting for response..`,
    time: command.time,
  });

  // Start processing lines from the CSV file
  const csvData = get(csvStore).rawData;
  intervalId = setInterval(() => processLine(csvData), 500); // 1 Hz interval

  return {
    ...$state,
    currentCommand: command,
    currentCommandIdx: 0,
  };
}

type KEvent = KeyboardEvent & {
  currentTarget: EventTarget & HTMLSpanElement;
};

const processLine = (csvData: string[][]) => {
  if (currentIndex < csvData.length) {
    const currentLine = csvData[currentIndex];
    if (currentIndex !== 0) {
      if (get(uiStore)?.terminalInputEl) {
        const terminalInputEl = get(uiStore)?.terminalInputEl;

        terminalInputEl?.scrollIntoView({ behavior: 'smooth' });

        terminalStore.setCurrentCommand({
          value: `CMD,2043,SIMP,${currentLine[1]}`,
          time: new Date(),
        });
      }
    }

    currentIndex++;
  } else {
    // If all lines are processed, clear the interval
    clearInterval(intervalId);
  }
};
