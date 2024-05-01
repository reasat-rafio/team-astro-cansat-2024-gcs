import type { SystemStatus } from '@/lib/@types/app.types';
import { writable } from 'svelte/store';

export interface TerminalType {
  cmd: string;
  format?: string;
  description: string;
  successMessage: string;
  state: SystemStatus;
}

function createValidTerminalCommandStore() {
  const { set, subscribe, update } = writable<TerminalType[]>([
    {
      cmd: 'CMD,2043,CX,ON',
      format: 'CMD,<TEAM_ID>,CX,<ON_OFF>',
      description: 'Activate container telemetry transmission',
      successMessage: 'Telemetry transmission is now active',
      state: 'notStarted' as SystemStatus,
    },
    {
      cmd: 'CMD,2043,CX,OFF',
      format: 'CMD,<TEAM_ID>,CX,<ON_OFF>',
      description: 'Deactivate container telemetry transmission',
      successMessage: 'Telemetry transmission is now inactive',
      state: 'notStarted' as SystemStatus,
    },
    {
      cmd: `CMD,2043,ST,<UTC_TIME>|GPS`,
      format: 'CMD,<TEAM_ID>,ST,<UTC_TIME>|GPS',
      description: 'Set mission time to 12:00:00',
      successMessage: 'Mission time set to 12:00:00',
      state: 'notStarted' as SystemStatus,
    },
    {
      cmd: 'CMD,2043,SIM,ENABLE',
      format: 'CMD,<TEAM_ID>,SIM,<MODE>',
      description: 'Enable simulation mode',
      successMessage: 'Simulation mode enabled',
      state: 'notStarted' as SystemStatus,
    },
    {
      cmd: 'CMD,2043,SIMP,<PRESSURE>',
      format: 'CMD,<TEAM_ID>,SIMP,<PRESSURE>',
      description: 'Provide simulated atmospheric pressure data',
      successMessage: 'Simulated pressure data provided',
      state: 'notStarted' as SystemStatus,
    },
    {
      cmd: 'CMD,2043,CAL',
      format: 'CMD,<TEAM_ID>,CAL',
      description: 'Calibrate altitude to zero',
      successMessage: 'Altitude calibrated to zero',
      state: 'notStarted' as SystemStatus,
    },
    {
      cmd: 'CMD,2043,BCN,ON',
      format: 'CMD,<TEAM_ID>,BCN,<ON|OFF>',
      description: 'Activate audio beacon',
      successMessage: 'Audio beacon activated',
      state: 'notStarted' as SystemStatus,
    },
    {
      cmd: 'CMD,2043,BCN,OFF',
      format: 'CMD,<TEAM_ID>,BCN,<ON|OFF>',
      description: 'Deactivate audio beacon',
      successMessage: 'Audio beacon deactivated',
      state: 'notStarted' as SystemStatus,
    },
    {
      cmd: 'help',
      format: 'help',
      description: 'Display the list of valid commands',
      successMessage: '',
      state: 'notStarted',
    },
    {
      cmd: 'clear',
      format: 'clear',
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

// function currentTime() {
//   return readable<Date | null>(null, (set) => {
//     // the update function sets the latest date
//     const update = () => set(new Date());

//     // force an update to initialize the store with a non-null value
//     update();

//     // setup an interval timer to update the store's value repeatedly over time
//     const interval = setInterval(update, 1000);

//     // return unsubscribe callback:
//     // it will stop the timer when the store is destroyed
//     return () => clearInterval(interval);
//   });
// }
