import type { CommandHistory } from '@/lib/@types/app.types';
import { derived, get, writable } from 'svelte/store';

interface CommandHistoryStore {
  commandHistory: CommandHistory[];
}

function createCommandHistoryStore() {
  const { subscribe, update, set } = writable<CommandHistoryStore>({
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
    update(() => {
      return { commandHistory: [] };
    });
  }

  function updateLastCommandStatus(status: 'success' | 'error' | 'pending') {
    update((currentState) => {
      const lastCommand =
        currentState.commandHistory[currentState.commandHistory.length - 1];

      if (lastCommand?.status) lastCommand.status = status;
      return currentState;
    });
  }

  function setLatestCommandOutput(output: string) {
    update((currentState) => {
      const lastCommand =
        currentState.commandHistory[currentState.commandHistory.length - 1];

      if (lastCommand?.output) lastCommand.output = output;
      return currentState;
    });
  }

  function getCommandHistoryById(id: string) {
    return get(commandHistoryStore).commandHistory.find(
      (command) => command.id === id,
    );
  }

  return {
    set,
    subscribe,
    setCommandHistory,
    clearHistory,
    getCommandHistoryById,
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
