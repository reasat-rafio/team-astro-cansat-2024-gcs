import type { TerminalCommand, TerminalType } from '@/lib/@types/app.types';
import { validCommands } from '@/lib/helpers/valid-terminal-commands';
import { get, writable } from 'svelte/store';
import commandHistoryStore from '../command.history.store';
import updateCommandHistory from './helpers/update-command-history';
import validTerminalCommandStoreStore from './valid-terminal-command.sore';

function createTerminalStore() {
  const { subscribe, update } = writable<TerminalType>({
    terminalUiState: 'minimize',
    currentCommand: undefined,
    currentCommandIdx: null,
  });

  function setUiState(terminalUiState: 'minimize' | 'maximize') {
    update((currentState) => ({ ...currentState, terminalUiState }));
  }

  function setCurrentCommand(command: TerminalCommand) {
    update((currentState) => {
      const { value } = command;

      const isValidCmd = isValidCommand(value);
      if (!isValidCmd) return returnInvalidCommandOutput(command, currentState);

      if (command.value === 'clear') {
        return clearCommandHistory(command, currentState);
      } else if (command.value === 'help') {
        return displayHelp(command, currentState);
      }

      const currentCommandSequenceIndex = getTheIndexOfTheCommand(value);

      if (currentState.currentCommandIdx === null) {
        if (currentCommandSequenceIndex === 0) {
          // if the command is the first command in the sequence
          return updateCommandHistory({
            command,
            currentState,
            status: 'pending',
            output: `<p>${command.value} running...</p>`,
          });
        }

        // if the command is not the first command in the sequence
        const precedingCommands = Object.keys(validCommands)
          .slice(0, currentCommandSequenceIndex)
          .join(', ');

        return updateCommandHistory({
          command,
          currentState,
          status: 'error',
          output: createErrorTemplate(value, precedingCommands),
        });
      } else if (
        // if the command is not the next command in the sequence
        currentState.currentCommandIdx + 1 !==
        currentCommandSequenceIndex
      ) {
        const precedingCommands = Object.keys(validCommands)
          .slice(
            currentState.currentCommandIdx + 1,
            currentCommandSequenceIndex,
          )
          .join(', ');

        return updateCommandHistory({
          command,
          currentState,
          status: 'error',
          output: createErrorTemplate(value, precedingCommands),
        });
      } else {
        // if the command is the next command in the sequence
        return updateCommandHistory({
          command,
          currentState,
          status: 'pending',
          output: `<p>${command.value} running...</p>`,
        });
      }
    });
  }

  return {
    subscribe,
    setUiState,
    setCurrentCommand,
  };
}

const terminalStore = createTerminalStore();
export default terminalStore;

// ============================ Helpers ============================
export function getTheIndexOfTheCommand(command: string) {
  return Object.keys(validCommands).findIndex((key) => command.includes(key));
}

export function createErrorTemplate(value: string, precedingCommands: string) {
  return `<p>Error: Unable to execute <span class="text-red-600">${value}</span> before completing the prerequisite command(s): <span class="text-red-600">${precedingCommands}</span> </p>`;
}

function isValidCommand(command: string) {
  return get(validTerminalCommandStoreStore).some((validCommand) =>
    command.includes(validCommand.name),
  );
}

function returnInvalidCommandOutput(
  command: TerminalCommand,
  currentState: TerminalType,
) {
  return updateCommandHistory({
    command,
    currentState,
    status: 'error',
    output: 'Invalid Command',
  });
}

function clearCommandHistory(
  command: TerminalCommand,
  currentState: TerminalType,
) {
  commandHistoryStore.clearHistory();

  return {
    ...currentState,
    currentCommand: command,
  };
}

function displayHelp(command: TerminalCommand, currentState: TerminalType) {
  const helpText = get(validTerminalCommandStoreStore).map(
    ({ name, description }) => `${name}: ${description}`,
  );

  return updateCommandHistory({
    command,
    currentState,
    status: 'success',
    output: helpText.join('\n'),
  });
}
