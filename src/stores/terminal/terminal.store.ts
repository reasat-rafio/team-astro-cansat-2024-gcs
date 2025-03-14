import type { TerminalCommand, TerminalType } from '@/lib/@types/app.types';
import { escapeAngleBrackets } from '@/lib/helpers/helper';
import {
  CMD_2043_CX_ON,
  CMD_2043_SIM_ACTIVATE,
  CMD_2043_SIM_DISABLE,
  CMD_2043_SIM_ENABLE,
} from '@/lib/helpers/terminal-actions';
import CMD_2043_BCN_OFF from '@/lib/helpers/terminal-actions/CMD_2043_BCN_OFF';
import CMD_2043_BCN_ON from '@/lib/helpers/terminal-actions/CMD_2043_BCN_ON';
import CMD_2043_CAL from '@/lib/helpers/terminal-actions/CMD_2043_CAL';
import CMD_2043_CX_OFF from '@/lib/helpers/terminal-actions/CMD_2043_CX_OFF';
import CMD_2043_ECHO from '@/lib/helpers/terminal-actions/CMD_2043_ECHO';
import CMD_2043_HS_OFF from '@/lib/helpers/terminal-actions/CMD_2043_HS_OFF';
import CMD_2043_HS_ON from '@/lib/helpers/terminal-actions/CMD_2043_HS_ON';
import CMD_2043_PC_OFF from '@/lib/helpers/terminal-actions/CMD_2043_PC_OFF';
import CMD_2043_PC_ON from '@/lib/helpers/terminal-actions/CMD_2043_PC_ON';
import CMD_2043_RESET from '@/lib/helpers/terminal-actions/CMD_2043_RESET';
import CMD_2043_SIMP_PRESSURE from '@/lib/helpers/terminal-actions/CMD_2043_SIMP_PRESSURE';
import CMD_2043_UTC_TIME__GPS from '@/lib/helpers/terminal-actions/CMD_2043_UTC_TIME__GPS';
import { get, writable } from 'svelte/store';
import commandHistoryStore from '../command.history.store';
import { addLog } from '../log.store';
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
    update(($state) => {
      const { value } = command;
      const commandParts = value.split(',');

      switch (command.value) {
        case 'clear':
          return clearCommandHistory(command, $state);
        case 'help':
          return displayHelp(command, $state);
      }

      if (commandParts[0] !== 'CMD' || commandParts.length < 3) {
        addLog({
          value: `Invalid command - ${command.value}`,
          time: command.time,
          state: 'error',
        });
        return updateCommandHistory({
          $state,
          command,
          status: 'error',
          output: `<p class="text-destructive">Error: Invalid command</p>`,
        });
      }

      // Validate TEAM_ID
      if (parseInt(commandParts[1]) !== 2043) {
        addLog({
          value: `Invalid TEAM_ID - ${command.value}`,
          time: command.time,
          state: 'error',
        });

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
        case 'ECHO':
          return CMD_2043_ECHO({ $state, command });

        case 'CX':
          if (lastParam !== 'ON' && lastParam !== 'OFF') {
            addLog({
              value: `Invalid command: CX command must be followed by ON or OFF - ${command.value}`,
              time: command.time,
              state: 'error',
            });

            return updateCommandHistory({
              command,
              $state,
              status: 'error',
              output: `<p class="text-destructive">Error: Invalid command: CX command must be followed by ON or OFF</p>`,
            });
          }

          switch (lastParam) {
            case 'ON':
              return CMD_2043_CX_ON({ $state, command });
            case 'OFF':
              return CMD_2043_CX_OFF({ $state, command });
          }
          break;

        case 'ST':
          if (lastParam !== 'GPS' && !lastParam.match(/\d{2}:\d{2}:\d{2}/)) {
            addLog({
              value: `Invalid command: ST command must be followed by a valid time or GPS - ${command.value}`,
              time: command.time,
              state: 'error',
            });

            return updateCommandHistory({
              command,
              $state,
              status: 'error',
              output: `<p class="text-destructive">Invalid command: ST command must be followed by a valid time or GPS</p>`,
            });
          }

          return CMD_2043_UTC_TIME__GPS({ $state, command });
          break;

        case 'CAL':
          return CMD_2043_CAL({ $state, command });

        case 'SIM':
          if (
            lastParam !== 'ENABLE' &&
            lastParam !== 'ACTIVATE' &&
            lastParam !== 'DISABLE'
          ) {
            addLog({
              value: `Invalid command: SIM command must be followed by ENABLE, ACTIVATE or DISABLE - ${command.value}`,
              time: command.time,
              state: 'error',
            });

            return updateCommandHistory({
              command,
              $state,
              status: 'error',
              output: `<p class="text-destructive">Invalid command: SIM command must be followed by ENABLE, ACTIVATE or DISABLE</p>`,
            });
          }

          switch (lastParam) {
            case 'ACTIVATE':
              return CMD_2043_SIM_ACTIVATE({ $state, command });
            case 'ENABLE':
              return CMD_2043_SIM_ENABLE({ $state, command });
            case 'DISABLE':
              return CMD_2043_SIM_DISABLE({ $state, command });
          }
          break;

        case 'SIMP':
          if (isNaN(parseInt(lastParam))) {
            addLog({
              value: `Invalid command: SIMP command must be followed by a number - ${command.value}`,
              time: command.time,
              state: 'error',
            });

            return updateCommandHistory({
              command,
              $state,
              status: 'error',
              output: `<p class="text-destructive">Invalid command: SIMP command must be followed by a number</p>`,
            });
          }

          return CMD_2043_SIMP_PRESSURE({ $state, command });
          break;

        case 'BCN':
          if (lastParam !== 'ON' && lastParam !== 'OFF') {
            addLog({
              value: `Invalid command: BCN command must be followed by ON or OFF - ${command.value}`,
              time: command.time,
              state: 'error',
            });

            return updateCommandHistory({
              command,
              $state,
              status: 'error',
              output: `<p class="text-destructive">Invalid command: BCN command must be followed by ON or OFF</p>`,
            });
          }

          switch (lastParam) {
            case 'ON':
              return CMD_2043_BCN_ON({ $state, command });
            case 'OFF':
              return CMD_2043_BCN_OFF({ $state, command });
          }
          break;
         
          case 'HS': // Added case for heatshield
          if (lastParam !== 'ON' && lastParam !== 'OFF') {
            addLog({
              value: `Invalid command: HS command must be followed by ON or OFF - ${command.value}`,
              time: command.time,
              state: 'error',
            });

            return updateCommandHistory({
              command,
              $state,
              status: 'error',
              output: `<p class="text-destructive">Invalid command: HS command must be followed by ON or OFF</p>`,
            });
          }

          switch (lastParam) {
            case 'ON':
              return CMD_2043_HS_ON({ $state, command });
            case 'OFF':
              return CMD_2043_HS_OFF({ $state, command });
          }
          break;

        case 'PC': // Added case for parachute
          if (lastParam !== 'ON' && lastParam !== 'OFF') {
            addLog({
              value: `Invalid command: PC command must be followed by ON or OFF - ${command.value}`,
              time: command.time,
              state: 'error',
            });

            return updateCommandHistory({
              command,
              $state,
              status: 'error',
              output: `<p class="text-destructive">Invalid command: PC command must be followed by ON or OFF</p>`,
            });
          }

          switch (lastParam) {
            case 'ON':
              return CMD_2043_PC_ON({ $state, command });
            case 'OFF':
              return CMD_2043_PC_OFF({ $state, command });
          }
          break;
          case "RESET":
              return CMD_2043_RESET({ $state, command })
             break;

        default:
          addLog({
            value: `Invalid command: ${commandType} is not a valid command - ${command.value}`,
            time: command.time,
            state: 'error',
          });

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
        status: 'error',
        output: `<p class="text-destructive">Error: Invalid command</p>`,
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

function displayHelp(command: TerminalCommand, $state: TerminalType) {
  const helpText = get(validTerminalCommandStoreStore).map(
    ({ format, description }) =>
      `<span class="font-semibold">${escapeAngleBrackets(format as string)}:</span> <span>${description}</span>`,
  );

  return updateCommandHistory({
    command,
    $state,
    status: 'success',
    output: helpText.join('\n'),
  });
}