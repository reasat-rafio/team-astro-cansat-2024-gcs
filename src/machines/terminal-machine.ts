import type {
  EnterCommand,
  SubmitCommand,
  TerminalContext,
  TerminalEvent
} from '@/lib/@types/app.types';
import { assign, createMachine } from 'xstate';

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
      currentCommand: '',
      output: ''
    },
    on: {
      ENTER_COMMAND: {
        actions: 'setCurrentCommand'
      },
      SUBMIT_COMMAND: {
        actions: ['addCommandToHistory', 'updateOutput']
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
        return {
          commandHistory: [
            ...context.commandHistory,
            { text: command, timestamp: new Date() }
          ]
        };
      }),
      updateOutput: assign(({ event }) => {
        const { command } = event as SubmitCommand;
        return {
          //   output: `${context.output}\n${command}`
          output: `${command}`
        };
      })
    }
  }
);

export default terminalMachine;
