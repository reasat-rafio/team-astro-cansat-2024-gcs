import type {
  EnterCommand,
  SubmitCommand,
  TerminalContext,
  TerminalEvent,
} from '@/lib/@types/app.types';
import { validCommands } from '@/lib/helper';
import { assign, createMachine } from 'xstate';
import { get } from 'svelte/store';
import gcsStore from '@/stores/gcs.store';

const terminalMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUwCcC2BLAdgQwBsACAZQE9YAXMDAYhIFUAhAWQElkB9AYQHkWWAQQByAEQDaABgC6iUAAcA9rCyUsinHJAAPRADYArADoAjJICcAZgDsBgDQgyiawF8XD1JlyFSFahiMMPG0sbAAvMFp2YTZ2AC0AUSlZJBAlFTUNLV0EMwAWI3NJPQAme0dESwNJIyqrWzcPdGx8YnIqGkDcUKwIqMEADVi2ROStdNV1TVSckxsjPINLEzKHJwQSywKADgN6gzd3EBxFCDgtTxafdv9x5UmsmcQAWmsTNcQTPOtavZsDo6XbxtPydIIhcJgO4ZKbZF6bD4ISySYzmPIlaySbaWHG4yyNEBA1q+DoBFo9CLQh7TUA5Ep5SwLPTbWyI5HbBbozHYvE41yHIA */
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
        const $gcsStore = get(gcsStore);

        let output: string = '';
        const subscription = $gcsStore.actorRef.subscribe((state) => {
          output = state.context.output;
        });

        let helpText = 'Available commands:\n';

        switch (command as (keyof typeof validCommands)[number]) {
          case 'CMD,2043,CX,ON':
            output = 'CX ON';
            break;

          case 'CMD,2043,SIM,ENABLE':
            $gcsStore.send({ type: 'ENABLE_SIMULATION' });
            break;

          case 'CMD,2043,SIM,ACTIVATE':
            $gcsStore.send({ type: 'ACTIVATE_SIMULATION' });
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

        subscription.unsubscribe();
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
