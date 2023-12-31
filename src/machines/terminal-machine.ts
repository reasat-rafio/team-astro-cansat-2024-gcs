import { createMachine } from 'xstate';

interface MachineEvent {}

interface Command {
  text: string;
  timestamp: Date;
}

interface TerminalContext {
  commandHistory: Command[];
  currentCommand: string;
  output: string;
}

const terminalMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBUwCcC2BLAdgQwBsACAZQE9YAXMDAOgzwA8tsAvMAYgHscBZXFlnYBtAAwBdRKAAOXWFkpYeUkI0QBaAJwAmWgEZNAVgDMe7YYA0IMogPHa50aOOjDegOyH3ADjMBfPytUTFxCUgpqOmwcQXZuPiZYsDFJJBBZeUVlNLUED01aU3MrGzzNe0dnVw8vX20AwJAcLgg4FWDosPIqGhUMhSUcFVz1PQAWUX0jIstrWz1aJycXN08fM0MAoPRO4m7I+kS2MD65AezQXIA2URLETW9aQyWVmvX6xo7QvYiaegFjqdMoNhogTIUNncENpNFdFi9qmtfA0-EA */
  id: 'Terminal System',
  initial: 'maximize',

  types: {
    context: {} as TerminalContext
  },

  context: {
    commandHistory: [],
    currentCommand: '',
    output: ''
  },
  states: {
    maximize: {
      on: {
        minimize: 'minimize'
      }
    },

    minimize: {
      on: {
        maximize: 'maximize'
      }
    }
  }
});

export default terminalMachine;
