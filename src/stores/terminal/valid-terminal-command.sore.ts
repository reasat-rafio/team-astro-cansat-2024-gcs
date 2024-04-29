import type { SystemStatus } from '@/lib/@types/app.types';
import { writable } from 'svelte/store';

export interface TerminalType {
  [key: string]: {
    name: string;
    description: string;
    successMessage: string;
    state: SystemStatus;
  };
}

function createValidTerminalCommandStore() {
  const { set, subscribe, update } = writable([
    {
      name: 'CMD,2043,CX,ON',
      description: 'Active container telemetry transmission',
      successMessage: 'Telemetry transmission is now active',
      state: 'notStarted',
    },
    {
      name: 'CAL',
      description:
        'Sets the flights software time to the current time read from the GPS module',
      successMessage: 'GPS is active',
      state: 'notStarted',
    },
    {
      name: 'CMD,2043,SIM,ENABLE',
      description: 'Disable the flight mode and switch to the simulation mode',
      successMessage: 'Simulation mode is now enabled',
      state: 'notStarted',
    },
    {
      name: 'CMD,2043,SIM,ACTIVATE',
      description: 'Activate the simulation mode',
      successMessage: 'Simulation mode is now activated',
      state: 'notStarted',
    },
    {
      name: 'CMD,2043,SIM,<PRESSURE>',
      description: 'Replace the pressure sensor data with the revived pressure',
      successMessage: 'Pressure is now set to the specified value',
      state: 'notStarted',
    },
    {
      name: 'CMD,2043,SIM,DISABLE',
      description: 'Disable the simulation mode and switch to the flight mode',
      successMessage: 'Simulation mode is now disabled',
      state: 'notStarted',
    },
    {
      name: 'help',
      description: 'Display the list of valid commands',
      successMessage: '',
      state: 'notStarted',
    },
    {
      name: 'clear',
      description: 'Clear the terminals',
      successMessage: '',
      state: 'notStarted',
    },
  ]);

  return {
    set,
    update,
    subscribe,
  };
}

const validTerminalCommandStoreStore = createValidTerminalCommandStore();
export default validTerminalCommandStoreStore;
