import { get, writable } from 'svelte/store';
import { validCommands } from '@/lib/helper';
import type {
  TerminalCommand,
  TerminalType,
  UpdateCommandHistory,
} from '@/lib/@types/app.types';
import commandHistoryStore, { lastCommand } from './command.history.store';

function getTheIndexOfTheCommand(command: string) {
  return Object.keys(validCommands).findIndex((key) => command.includes(key));
}

function createErrorTemplate(value: string, precedingCommands: string) {
  return `<p>Error: Unable to execute <span class="text-red-600">${value}</span> before completing the prerequisite command(s): <span class="text-red-600">${precedingCommands}</span> </p>`;
}

function getCurrentSuccessOutput() {
  return (
    validCommands[
      get(terminalStore).currentCommand?.value as keyof typeof validCommands
    ]?.successMessage ?? ''
  );
}

function CMD_2043_CX_ON() {
  if (get(lastCommand).status === 'pending') {
    setTimeout(() => {
      commandHistoryStore.setLatestCommandOutput(getCurrentSuccessOutput());
      commandHistoryStore.updateLastCommandStatus('success');
    }, 500);
  }
  return {
    error: null,
  };
}
function CMD_2043_SIM_ENABLE() {
  if (get(lastCommand).status === 'pending') {
    setTimeout(() => {
      commandHistoryStore.setLatestCommandOutput(getCurrentSuccessOutput());
      commandHistoryStore.updateLastCommandStatus('success');
    }, 500);
  }
  return {
    error: null,
  };
}

function CMD_2043_SIM_ACTIVATE() {
  if (get(lastCommand).status === 'pending') {
    setTimeout(() => {
      commandHistoryStore.setLatestCommandOutput(getCurrentSuccessOutput());
      commandHistoryStore.updateLastCommandStatus('success');
    }, 500);
  }
  return {
    error: null,
  };
}

function CMD_2043_SIM_DISABLE() {
  if (get(lastCommand).status === 'pending') {
    setTimeout(() => {
      commandHistoryStore.setLatestCommandOutput(getCurrentSuccessOutput());
      commandHistoryStore.updateLastCommandStatus('success');
    }, 500);
  }
  return {
    error: null,
  };
}

function CMD_2043_ST_GPS() {
  if (get(lastCommand).status === 'pending') {
    setTimeout(() => {
      commandHistoryStore.setLatestCommandOutput(getCurrentSuccessOutput());
      commandHistoryStore.updateLastCommandStatus('success');
    }, 500);
  }
  return {
    error: null,
  };
}

function CAL() {
  if (get(lastCommand).status === 'pending') {
    setTimeout(() => {
      commandHistoryStore.setLatestCommandOutput(getCurrentSuccessOutput());
      commandHistoryStore.updateLastCommandStatus('success');
    }, 500);
  }
  return {
    error: null,
  };
}

export function cmdAction(command: string) {
  switch (command as (keyof typeof validCommands)[number]) {
    case 'CMD,2043,CX,ON':
      return CMD_2043_CX_ON();

    case 'CMD,2043,SIM,ENABLE':
      return CMD_2043_SIM_ENABLE();

    case 'CMD,2043,SIM,ACTIVATE':
      return CMD_2043_SIM_ACTIVATE();

    case 'CMD,2043,SIM,DISABLE':
      return CMD_2043_SIM_DISABLE();

    case 'CMD,2043,ST,GPS':
      return CMD_2043_ST_GPS();

    case 'CAL':
      return CAL();

    case 'CMD,2043,SIM,<PRESSURE>':
      return {
        success: true,
        error: null,
      };

    default:
      return {
        error: "Command doesn't exist",
      };
  }
}

function createTerminalStore() {
  const { subscribe, update } = writable<TerminalType>({
    uiState: 'minimize',
    currentCommand: undefined,
    currentCommandIdx: null,
  });

  function updateCommandHistory({
    currentState,
    command,
    output,
    status,
  }: UpdateCommandHistory) {
    commandHistoryStore.setCommandHistory({ ...command, output, status });
    return {
      ...currentState,
      currentCommand: command,
      currentCommandIdx: getTheIndexOfTheCommand(command.value),
    };
  }

  function setUiState(uiState: 'minimize' | 'maximize') {
    update((currentState) => ({ ...currentState, uiState }));
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
          // commandHistory: [],
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
