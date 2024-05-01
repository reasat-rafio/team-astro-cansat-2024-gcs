import type { TerminalCommand, TerminalType } from '@/lib/@types/app.types';
import { get, writable } from 'svelte/store';
import commandHistoryStore from '../command.history.store';
import updateCommandHistory from './helpers/update-command-history';
import validTerminalCommandStoreStore from './valid-terminal-command.sore';
import { escapeAngleBrackets } from '@/lib/helpers/helper';
import { CMD_2043_CX_ON } from '@/lib/helpers/terminal-actions';
import CMD_2043_CX_OFF from '@/lib/helpers/terminal-actions/CMD_2043_CX_OFF';

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
    update(($state) => {
      const { value } = command;

      if (command.value === 'clear') {
        return clearCommandHistory(command, $state);
      } else if (command.value === 'help') {
        return displayHelp(command, $state);
      }

      const commandParts = value.split(',');
      // Validate TEAM_ID
      if (parseInt(commandParts[1]) !== 2043) {
        return updateCommandHistory({
          $state,
          command,
          status: 'error',
          output: `<p class="text-destructive">Error: Invalid TEAM_ID</p>`,
        });
      }

      const commandType = commandParts[2];
      const lastParam = commandParts[3];

      switch (commandType) {
        case 'CX':
          if (lastParam !== 'ON' && lastParam !== 'OFF') {
            return updateCommandHistory({
              command,
              $state,
              status: 'error',
              output: `<p class="text-destructive">Invalid command: CX command must be followed by ON or OFF</p>`,
            });
          }
          if (lastParam === 'ON') {
            return CMD_2043_CX_ON({ $state, command });
          } else if (lastParam === 'OFF') {
            return CMD_2043_CX_OFF({ $state, command });
          }
          break;
        case 'ST':
          if (lastParam !== 'GPS' && !lastParam.match(/\d{2}:\d{2}:\d{2}/)) {
            return updateCommandHistory({
              command,
              $state,
              status: 'error',
              output: `<p class="text-destructive">Invalid command: ST command must be followed by a valid time or GPS</p>`,
            });
          }
          break;
        case 'SIM':
          if (
            lastParam !== 'ENABLE' &&
            lastParam !== 'ACTIVATE' &&
            lastParam !== 'DISABLE'
          ) {
            return updateCommandHistory({
              command,
              $state,
              status: 'error',
              output: `<p class="text-destructive">Invalid command: SIM command must be followed by ENABLE, ACTIVATE or DISABLE</p>`,
            });
          }
          break;
        case 'SIMP':
          if (isNaN(parseInt(lastParam))) {
            return updateCommandHistory({
              command,
              $state,
              status: 'error',
              output: `<p class="text-destructive">Invalid command: SIMP command must be followed by a number</p>`,
            });
          }
          break;
        case 'BCN':
          if (lastParam !== 'ON' && lastParam !== 'OFF') {
            return updateCommandHistory({
              command,
              $state,
              status: 'error',
              output: `<p class="text-destructive">Invalid command: BCN command must be followed by ON or OFF</p>`,
            });
          }
          break;
        default:
          return updateCommandHistory({
            command,
            $state,
            status: 'error',
            output: `<p class="text-destructive">Invalid command: ${commandType} is not a valid command</p>`,
          });
      }

      return updateCommandHistory({
        command,
        $state,
        status: 'pending',
        output: `<p>${command.value} running...</p>`,
      });
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
  return get(validTerminalCommandStoreStore).findIndex((validCommand) =>
    command.includes(validCommand.cmd),
  );
}

export function createErrorTemplate(value: string, precedingCommands: string) {
  return `<p>Error: Unable to execute <span class="text-red-600">${value}</span> before completing the prerequisite command(s): <span class="text-red-600">${precedingCommands}</span> </p>`;
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
    ({ format, description }) =>
      `<span class="font-semibold">${escapeAngleBrackets(format as string)}:</span> <span>${description}</span>`,
  );

  return updateCommandHistory({
    command,
    currentState,
    status: 'success',
    output: helpText.join('\n'),
  });
}
