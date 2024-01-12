import { assign, createMachine } from 'xstate';

type IMPORT_CSV = { type: 'IMPORT_CSV'; data: string[][] };
type MachineEvent =
  | IMPORT_CSV
  | { type: 'PROCESS_COMPLETE' }
  | { type: 'COMPLETE' }
  | { type: 'START_PROCESS' };

const csvProcessingMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGNYDcAKAnA9susAlgHZQB0hEANmAMQCSAshgPIBKAKgPoDCAygDUA2gAYAuolAAHHEQAuhHMUkgAHogCMANgDMZAJyHDO-ToDsG0wA4ALABoQAT00izZM2Z02ATAFZXGiJa3jreAL5hDqiYuPiwRKRk0VyEsFywcjhYkLQYbCw8AKJ8fKISSCAy8orKFeoINma+ZF7mQX46Wr5NDs4IGjoiZP4ioyK+3oGDVhFR6Nh4BCTkUrFLpLQ8LMwAMoUchWUqVYQKSir1VlpDVt5WIjb63jaWd769moNkj4a241oaMzeLoRSIgYg4CBwFTRBZxBJQY6yU41C6IAC0Wg+CExsxAsLW8WWFGoYCR1XOdUQPmxAyGRn0f18AKBILBBMWRMSyVS6Uy2Qg5JRlNA9VCenMjzMIkmGm65lpOg0ZDGYwmUxEM3Z80JCLIq05CKFZ1qosQ130ZA0z30j2uAKsGg02Md3yMVn8AMlWjMeI58OJyBwAFspDQ5JBjaiqf1Rlpvlorrd9BadL59LTvJazD8rLY846ujZQWEgA */
    id: 'csvProcessing',
    initial: 'idle',
    types: {
      context: {} as {
        csvData: string[][];
        currentIndex: number;
        intervalId: NodeJS.Timeout | null;
      },
      events: {} as MachineEvent,
    },
    context: {
      csvData: [],
      currentIndex: 0,
      intervalId: null,
    },
    states: {
      idle: {
        on: {
          IMPORT_CSV: {
            actions: 'saveCSVData',
            target: 'csv_is_stored',
            reenter: true,
          },
        },
      },

      csv_is_stored: {
        on: {
          START_PROCESS: 'processing',
        },
      },

      processing: {
        on: {
          COMPLETE: 'completed',
        },
        entry: 'startProcessing',
        exit: 'stopProcessing',
      },
      completed: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      saveCSVData: assign(({ event }) => {
        const { data } = event as IMPORT_CSV;
        return { csvData: data };
      }),

      startProcessing: ({ context }) => {
        context.intervalId = setInterval(() => {
          if (context.currentIndex < context.csvData.length) {
            const currentLine = context.csvData[context.currentIndex];
            const headerRow = context.csvData[0];

            const lineObject = {};
            headerRow.forEach((columnName, index) => {
              lineObject[columnName] = currentLine[index];
            });

            console.log('Processing line:', lineObject);

            // Update the index for the next iteration
            context.currentIndex++;
          } else {
            // If all lines are processed, stop the interval
            clearInterval(context.intervalId as NodeJS.Timeout);
            context.intervalId = null;
            console.log('Processing complete');
          }
        }, 1000);
      },
      stopProcessing: ({ context }) => {
        clearInterval(context.intervalId as NodeJS.Timeout);
        context.intervalId = null;
        console.log('Processing complete');
      },
    },
  },
);

export default csvProcessingMachine;
