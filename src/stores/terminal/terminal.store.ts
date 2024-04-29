import { writable } from 'svelte/store';
import { validCommands } from '@/lib/helper';
import type { TerminalCommand, TerminalType } from '@/lib/@types/app.types';
import commandHistoryStore from '../command.history.store';
import updateCommandHistory from './helpers/update-command-history';

export function getTheIndexOfTheCommand(command: string) {
  return Object.keys(validCommands).findIndex((key) => command.includes(key));
}

export function createErrorTemplate(value: string, precedingCommands: string) {
  return `<p>Error: Unable to execute <span class="text-red-600">${value}</span> before completing the prerequisite command(s): <span class="text-red-600">${precedingCommands}</span> </p>`;
}

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
      const isValidCommand = Object.keys(validCommands).some((key) =>
        value.includes(key),
      );

      if (!isValidCommand) {
        return updateCommandHistory({
          command,
          currentState,
          status: 'error',
          output: 'Invalid Command',
        });
      }

      if (command.value === 'clear') {
        commandHistoryStore.clearHistory();

        return {
          ...currentState,
          currentCommand: command,
        };
      } else if (command.value === 'help') {
        const helpText = Object.entries(validCommands).map(
          ([command, { description }]) => `${command}: ${description}`,
        );

        return updateCommandHistory({
          command,
          currentState,
          status: 'success',
          output: helpText.join('\n'),
        });
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
        } else {
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
        }
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
