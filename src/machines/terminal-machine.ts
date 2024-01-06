import type {
  EnterCommand,
  SubmitCommand,
  TerminalContext,
  TerminalEvent
} from '@/lib/@types/app.types';
import { assign, createMachine } from 'xstate';

export const validCommands = {
  'CMD,2043,CX,ON': 'Active container telemetry transmission',

  CAL: 'Calibrate the telemetry data altitude to 0 meters',

  'CMD,2043,ST,GPS':
    'Sets the flights software time to the current time read from the GPS module',

  'CMD,2043,SIM,ENABLE':
    'Disable the flight mode and switch to the simulation mode',

  'CMD,2043,SIM,ACTIVATE': 'Activates the simulation mode',

  'CMD,2043,SIM,<PRESSURE>':
    'Replace the pressure sensor data with the revived pressure',

  'CMD,2043,SIM,DISABLE':
    'Disable the simulation mode and switch back to the flight mode',

  help: 'Display available commands and their descriptions',

  clear: 'Clear the terminal history'
} as const;

const terminalMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUwCcC2BLAdgQwBsACAZQE9YAXMDAYgFEA5ZegJQH0BhAeQFleAgowAiAbQAMAXUSgADgHtYWSlnk4ZIAB6IAjABYAzADodAJgCsAGhBldBvUb3iAbBYC+b66ky5CpCtR0JACqAEK8AJLIXHyCIhLSSCAKSipqGtoIOgbmJuIAnAYA7FY2uqYeXujY+MTkVDRGGHiaWNgAXmC0kYwRkQBa9AkaKcqq6kmZOkUO+S4W1rYIObk5hSWVIN41fvWBTbhtWJ3dAgAafRGDw0mjaROgUzNGc66lSwbiDgAc5uvmHk8IBw8ggcA0218dQCNBGijG6UmiAAtDpFohTNMjGtigCgZDav4Ghgmi0jp04alxhlEHoiujljpxC89KYiuJvgYudyDJsCbsYSSauSwJSEQ8tIgDNlHM5viUGdLjHpWezOTyuUVAW4gA */
    id: 'Terminal System',

    types: {
      context: {} as TerminalContext,
      events: {} as TerminalEvent
    },

    context: {
      commandHistory: [],
      currentCommand: ''
    },
    on: {
      SUBMIT_COMMAND: {
        actions: ['setCurrentCommand', 'addCommandToHistory']
      }
    },

    states: {
      maximize: {
        on: {
          MINIMIZE: 'minimize'
        }
      },

      minimize: {
        on: {
          MAXIMIZE: 'maximize'
        }
      }
    },

    initial: 'maximize'
  },
  {
    actions: {
      setCurrentCommand: assign(({ event }) => {
        const { command } = event as EnterCommand;
        return {
          currentCommand: command
        };
      }),
      addCommandToHistory: assign(({ event, context }) => {
        const { command } = event as SubmitCommand;
        const output = setOutput(command);

        if (command === 'clear')
          return { commandHistory: [], currentCommand: '' };
        return {
          commandHistory: [
            ...context.commandHistory,
            { text: command, timestamp: new Date(), output }
          ]
        };
      })
    }
  }
);

export default terminalMachine;

function setOutput(command: string): string {
  let output: string;
  let helpText = 'Available commands:\n';

  switch (command as (keyof typeof validCommands)[number]) {
    case 'CMD,2043,CX,ON':
      output = 'CX ON';
      break;

    case 'CMD,2043,SIM,ACTIVATE':
      output = 'SIM ACTIVATED';
      break;

    case 'CMD,2043,SIM,DISABLE':
      output = 'SIM DISABLED';
      break;

    case 'CMD,2043,SIM,ENABLE':
      output = 'SIM ENABLED';
      break;

    case 'CMD,2043,ST,GPS':
      output = 'GPS STATUS';
      break;

    case 'CAL':
      output = 'CALIBRATING';
      break;

    case 'CMD,2043,SIM,<PRESSURE>':
      output = 'SIM PRESSURE';
      break;

    case 'help':
      for (const [command, description] of Object.entries(validCommands)) {
        helpText += `\n- ${command}: ${description}`;
      }
      output = helpText;
      break;

    case 'clear':
      output = '';
      break;

    default:
      output = 'Invalid command';
      break;
  }
  return output;
}
