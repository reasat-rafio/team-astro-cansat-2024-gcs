import type {
  EnterCommand,
  SubmitCommand,
  TerminalContext,
  TerminalEvent,
} from '@/lib/@types/app.types';
import { validCommands } from '@/lib/helper';
import { assign, createActor, createMachine, interpret } from 'xstate';

const terminalMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUwCcC2BLAdgQwBsACAZQE9YAXMDAYgFEA5ZegJQH0BhAeQFleAgowAiAbQAMAXUSgADgHtYWSlnk4ZIAB6IAjABYAzADodAJgCsAGhBldBvUb3iAbBYC+b66ky5CpCtR0JACqAEK8AJLIXHyCIhLSSCAKSipqGtoIOgbmJuIAnAYA7FY2uqYeXujY+MTkVDRGGHiaWNgAXmC0kYwRkQBa9AkaKcqq6kmZOkUO+S4W1rYIObk5hSWVIN41fvWBTbhtWJ3dAgAafRGDw0mjaROgUzNGc66lSwbiDgAc5uvmHk8IBw8ggcA0218dQCNBGijG6UmiAAtDpFohTNMjGtigCgZDav4Ghgmi0jp04alxhlEHoiujljpxC89KYiuJvgYudyDJsCbsYSSauSwJSEQ8tIgDNlHM5viUGdLjHpWezOTyuUVAW4gA */
    id: 'Terminal System',

    types: {
      context: {} as TerminalContext,
      events: {} as TerminalEvent,
    },

    context: {
      commandHistory: [],
      currentCommand: '',
    },
    on: {
      SUBMIT_COMMAND: {
        actions: ['setCurrentCommand', 'triggerCommandAnsSaveToHistory'],
      },
    },

    states: {
      maximize: {
        on: {
          MINIMIZE: 'minimize',
        },
      },

      minimize: {
        on: {
          MAXIMIZE: 'maximize',
        },
      },
    },

    initial: 'maximize',
  },
  {
    actions: {
      setCurrentCommand: assign(({ event }) => {
        const { command } = event as EnterCommand;
        return {
          currentCommand: command,
        };
      }),
      triggerCommandAnsSaveToHistory: assign(({ event, context }) => {
        const { command } = event as SubmitCommand;

        let output: string;
        let helpText = 'Available commands:\n';

        switch (command as (keyof typeof validCommands)[number]) {
          case 'CMD,2043,CX,ON':
            output = 'CX ON';
            break;

          case 'CMD,2043,SIM,ENABLE':
            // gcsService.send({ type: 'ENABLE_SIMULATION' });
            output = 'SIM ENABLED';
            break;

          case 'CMD,2043,SIM,ACTIVATE':
            output = 'SIM ACTIVATED';
            break;

          case 'CMD,2043,SIM,DISABLE':
            output = 'SIM DISABLED';
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
            for (const [command, description] of Object.entries(
              validCommands,
            )) {
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

        if (command === 'clear')
          return { commandHistory: [], currentCommand: '' };
        return {
          commandHistory: [
            ...context.commandHistory,
            { text: command, timestamp: new Date(), output },
          ],
        };
      }),
    },
  },
);

export default terminalMachine;
