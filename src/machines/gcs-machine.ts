import type { MachineContext, MachineEvent } from '$lib/@types/app.types';
import { assign, createActor, createMachine } from 'xstate';

const gcsMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QHEBOB7ArgOwgAgGF1sAXDAGzwGUBPWEsAWwGIBpASQBlOBtABgC6iUAAd0sAJYkJxYSAAeiABwBGAGwAaEDUQq+ATgB0Adj4BmFQCYArAF9bWtFlyFiZdJVr0mh2OTBgIswAggQAKuwAasFhAKL8QkggYpLSskmKCPoALGZaOgjqRqYWNvaOGDj4RKQU1HQMjIaoONgS2FDMAKoACgAiMbEA+gNhwQlyKVIy2HKZNnz5iNn2DiDY6BBwck5VrrUe9d6Mk+LT6aDzfJZLCAC0SmaGdmu7LjXung0+fgEip6kZnNlOpbipTIZLOYrC8Ks5qm46l5Gs1Wu0oADzrMMroVGZrM9SrkzOYzNklDdtLpjMZDNlrKVYSA3giDl9joYGKhGO0AIYMCCYtLYy6IHJ5KmFPSQ6GWNTGElqEnZfSrWxAA */
    id: 'Ground Control System',

    initial: 'sleep',
    types: {
      context: {} as MachineContext,
      events: {} as MachineEvent
    },
    context: {
      acceleration: {
        values: [],
        timestamps: []
      },
      airPressure: {
        values: [],
        timestamps: []
      },
      airSpeed: {
        values: [],
        timestamps: []
      },
      altitude: {
        values: [],
        timestamps: []
      },
      temperature: {
        values: [],
        timestamps: []
      },
      batteryVoltage: {
        values: [],
        timestamps: []
      },
      gpsCoordinates: {
        values: [],
        timestamps: []
      },
      gyroscope: {
        values: [],
        timestamps: []
      },
      longitude: {
        values: [],
        timestamps: []
      },
      satellitesTracked: {
        values: [],
        timestamps: []
      },
      tiltAngle: {
        values: [],
        timestamps: []
      }
    },

    states: {
      sleep: {
        on: {
          ACTIVATE: {
            target: 'running',
            actions: 'activate'
          }
        }
      },

      running: {
        entry: 'notifyActive',
        exit: 'notifyInactive',
        on: {
          UPDATE_DATA: {
            actions: 'updateAcceleration'
          }
        }
      },

      terminated: {}
    },

    on: {
      KILL: '.terminated'
    }
  },
  {
    actions: {
      activate: () => {
        console.log('activating...');
      },
      notifyActive: () => {
        console.log('active!');
      },
      notifyInactive: () => {
        console.log('inactive!');
      },
      updateAcceleration: assign(({ event }) => {
        return {
          airSpeed: {
            values: [
              (
                event as {
                  type: 'UPDATE_DATA';
                  value: string;
                }
              ).value
            ],
            timestamps: ['2']
          }
        };
      })
    }
  }
);

export const gcsService = createActor(gcsMachine).start();
