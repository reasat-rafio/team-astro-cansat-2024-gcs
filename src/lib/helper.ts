export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}
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

  clear: 'Clear the terminal history',
} as const;
