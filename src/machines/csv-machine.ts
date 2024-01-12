import { createMachine } from 'xstate';

const csvProcessingMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGNYDcAKAnA9susAlgHZQB0hEANmAMQCqGAMgPICCAIgPoDCAygDUA2gAYAuolAAHHEQAuhHMUkgAHogDsAVgCcZAGw6NOgBwBmAIzaTAJmMAaEAE9ENkWbIjdAFn0idNmb6ZjbeOgC+4Y6omLj4sESkZFJxBCRQtBgASiw8AKJ8fLwsALLMeQAqeaISSCAy8orKdeoI2jZkuiYiIm6h+loWJo4ubUOdQ-6hOjo9GhaRUSDEOBBwKjHYeGmkKg2ECkoqrQC0Gh5aujohFt7egWZ3I4gWFlqdPvoaNm82ARomSLRdBbeKJciUGh7WQHJrHRAnGzvS4zG53B53MzPBBIkxkbxma4WQm9bpaIEgTapBLpZLU8HQxpHFqIfTdMhWEwWHT3WwDDTYkIeMzdYneQZ+ILeClU7Y0pLIHAAWykNDkkEZsOZoFaNjZZDMxhsJm0t3FxKxzkQJv0BqNAJ0WkJGmMi3CQA */
    id: 'csvProcessing',
    initial: 'idle',
    types: {
      context: {} as {
        csvData: string[][];
        currentIndex: number;
        intervalId: NodeJS.Timeout | null;
      },
    },
    context: {
      csvData: [],
      currentIndex: 0,
      intervalId: null,
    },
    states: {
      idle: {
        on: {
          UPLOAD_CSV: 'processing',
        },
      },
      processing: {
        entry: 'startProcessing',
        invoke: {
          id: 'processLineInterval',
          src: 'processLineInterval',
        },
        on: {
          PROCESS_COMPLETE: 'completed',
        },
        exit: 'stopProcessing',
      },
      completed: {
        type: 'final',
      },
    },
  },
  {
    actions: {
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
    // services: {
    //   processLineInterval:
    //     ({}) =>
    //     (sendBack) => {
    //       sendBack('PROCESS_LINE');
    //     },
    // },
  },
);

export default csvProcessingMachine;
