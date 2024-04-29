export const validCommands = {
  'CMD,2043,CX,ON': {
    description: 'Active container telemetry transmission',
    successMessage: 'Telemetry transmission is now active',
  },

  CAL: {
    description: 'Calibrate the telemetry data altitude to 0 meters',
    successMessage: 'Sensors are now calibrated',
  },

  'CMD,2043,ST,GPS': {
    description:
      'Sets the flights software time to the current time read from the GPS module',
    successMessage: 'GPS is active',
  },

  'CMD,2043,SIM,ENABLE': {
    description: 'Disable the flight mode and switch to the simulation mode',
    successMessage: 'Simulation mode is now enabled',
  },

  'CMD,2043,SIM,ACTIVATE': {
    description: 'Activate the simulation mode',
    successMessage: 'Simulation mode is now activated',
  },

  'CMD,2043,SIM,<PRESSURE>': {
    description: 'Replace the pressure sensor data with the revived pressure',
    successMessage: 'Pressure is now set to the specified value',
  },

  'CMD,2043,SIM,DISABLE': {
    description: 'Disable the simulation mode and switch to the flight mode',
    successMessage: 'Simulation mode is now disabled',
  },
  help: {
    description: 'Display the list of valid commands',
    successMessage: '',
  },

  clear: {
    description: 'Clear the terminal',
    successMessage: '',
  },
} as const;

export type validCommandsType = typeof validCommands;
