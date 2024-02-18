import { writable } from 'svelte/store';
import { validCommands } from '@/lib/helper';

interface Command {
  time: Date;
  value: string;
}

interface CommandHistory extends Command {
  output: string;
}

interface TerminalType {
  uiState: 'minimize' | 'maximize';
  currentCommand?: Command;
  previousCommand?: Command;
  commandHistory: CommandHistory[];
  currentValidCommandIdx: null | number;
}

function getTheIndexOfTheCommand(command: string) {
  return Object.keys(validCommands).findIndex((key) => command.includes(key));
}

function createErrorTemplate(value: string, precedingCommands: string) {
  return `<p>Error: Unable to execute <span class="text-red-600">${value}</span> before completing the prerequisite command(s): <span class="text-red-600">${precedingCommands}</span> </p>`;
}

const createTerminalStore = () => {
  const { subscribe, update } = writable<TerminalType>({
    uiState: 'maximize',
    currentCommand: undefined,
    currentValidCommandIdx: null,
    commandHistory: [],
  });

  const updateCommandHistory = (
    currentState: TerminalType,
    command: Command,
    output: string,
  ) => ({
    ...currentState,
    commandHistory: [...currentState.commandHistory, { ...command, output }],
    currentCommand: command,
  });

  function setUiState(uiState: 'minimize' | 'maximize') {
    update((currentState) => ({ ...currentState, uiState }));
  }

  function setCurrentCommand(command: Command) {
    update((currentState) => {
      const { value } = command;
      const isValidCommand = Object.keys(validCommands).some((key) =>
        value.includes(key),
      );

      if (!isValidCommand) {
        return updateCommandHistory(currentState, command, 'Invalid Command');
      }

      const currentCommandSequenceIndex = getTheIndexOfTheCommand(value);
      const successMessage =
        validCommands[value as keyof typeof validCommands]?.successMessage ??
        '';

      if (currentState.currentValidCommandIdx === null) {
        if (currentCommandSequenceIndex === 0) {
          return updateCommandHistory(
            currentState,
            command,
            `<p>${successMessage}</p>`,
          );
        } else {
          const precedingCommands = Object.keys(validCommands)
            .slice(0, currentCommandSequenceIndex)
            .join(', ');
          return updateCommandHistory(
            currentState,
            command,
            createErrorTemplate(value, precedingCommands),
          );
        }
      } else if (
        currentState.currentValidCommandIdx + 1 !==
        currentCommandSequenceIndex
      ) {
        const precedingCommands = Object.keys(validCommands)
          .slice(
            currentState.currentValidCommandIdx + 1,
            currentCommandSequenceIndex,
          )
          .join(', ');
        return updateCommandHistory(
          currentState,
          command,
          createErrorTemplate(value, precedingCommands),
        );
      } else {
        return updateCommandHistory(
          currentState,
          command,
          `<p>${successMessage}</p>`,
        );
      }
    });
  }

  return {
    subscribe,
    setUiState,
    setCurrentCommand,
  };
};

const terminalStore = createTerminalStore();
export default terminalStore;

// switch (command.value as (keyof typeof validCommands)[number]) {
//   case 'CMD,2043,CX,ON':
//     //  output = 'CX ON';
//     break;

//   case 'CMD,2043,SIM,ENABLE':
//     //  $gcsStore.send({ type: 'ENABLE_SIMULATION' });
//     break;

//   case 'CMD,2043,SIM,ACTIVATE':
//     //  $gcsStore.send({ type: 'ACTIVATE_SIMULATION' });
//     break;

//   case 'CMD,2043,SIM,DISABLE':
//     //  $gcsStore.send({ type: 'DISABLE_SIMULATION' });
//     //  output = 'SIM DISABLED';
//     break;

//   case 'CMD,2043,ST,GPS':
//     //  output = 'GPS STATUS';
//     break;

//   case 'CAL':
//     //  output = 'CALIBRATING';
//     break;

//   case 'CMD,2043,SIM,<PRESSURE>':
//     //  output = 'SIM PRESSURE';
//     break;

//   case 'help':
//     //  for (const [command, description] of Object.entries(validCommands)) {
//     //    helpText += `\n- ${command}: ${description}`;
//     //  }
//     //  output = helpText;
//     break;

//   case 'clear':
//     //  output = '';
//     break;

//   default:
//     //  output = 'Invalid command';
//     break;
// }

// return { ...$store, currentCommand: command };
