import type { CommandHistory } from '@/lib/@types/app.types';
import { derived, writable } from 'svelte/store';

interface CommandHistoryStore {
  commandHistory: CommandHistory[];
}

function createCommandHistoryStore() {
  const { subscribe, update } = writable<CommandHistoryStore>({
    commandHistory: [],
  });

  function setCommandHistory(commandHistory: CommandHistory) {
    update((store) => {
      return {
        commandHistory: [...store.commandHistory, commandHistory],
      };
    });
  }

  function clearHistory() {
    update((store) => {
      return { commandHistory: [] };
    });
  }

  function updateLastCommandStatus(status: 'success' | 'error' | 'pending') {
    update((currentState) => {
      const lastCommand =
        currentState.commandHistory[currentState.commandHistory.length - 1];

      lastCommand.status = status;
      return currentState;
    });
  }

  function setLatestCommandOutput(output: string) {
    update((currentState) => {
      const lastCommand =
        currentState.commandHistory[currentState.commandHistory.length - 1];

      lastCommand.output = output;
      return currentState;
    });
  }

  return {
    subscribe,
    setCommandHistory,
    clearHistory,
    updateLastCommandStatus,
    setLatestCommandOutput,
  };
}

const commandHistoryStore = createCommandHistoryStore();
export default commandHistoryStore;

export const lastCommand = derived(
  commandHistoryStore,
  ($commandHistoryStore) => {
    return $commandHistoryStore.commandHistory[
      $commandHistoryStore.commandHistory.length - 1
    ];
  },
);
