import { writable } from 'svelte/store';

interface Command {
  time: string;
  value: string;
}

interface TerminalType {
  uiState: 'minimize' | 'maximize';
  currentCommand?: Command;
  previousCommand?: Command;
  commandHistory?: Command[];
}

const commandSequence = [''];
const createTerminalStore = () => {
  const { subscribe, update } = writable<TerminalType>({
    uiState: 'maximize',
    currentCommand: undefined,
    previousCommand: undefined,
    commandHistory: [],
  });

  function setUiState(uiState: 'minimize' | 'maximize') {
    update(($store) => ({ ...$store, uiState }));
  }

  function setCurrentCommand(command: Command) {
    update(($store) => ({ ...$store, currentCommand: command }));
  }

  function setPreviousCommand(command: Command) {
    update(($store) => ({ ...$store, previousCommand: command }));
  }

  function setCommandHistory(command: Command) {
    update(($store) => ({
      ...$store,
      commandHistory: [...($store?.commandHistory ?? []), command],
    }));
  }

  return {
    subscribe,
    setUiState,
    setCurrentCommand,
    setCommandHistory,
    setPreviousCommand,
  };
};

const terminalStore = createTerminalStore();
export default terminalStore;
