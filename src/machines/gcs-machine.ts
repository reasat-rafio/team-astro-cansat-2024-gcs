import type {
  MachineContext,
  MachineEvent,
  UpdateAirPressure,
  UpdateAirSpeed,
  UpdateAltitude,
  UpdateBatteryVoltage,
  UpdateGPSCoordinates,
  UpdateTemperature,
} from '$lib/@types/app.types';
import { get } from 'svelte/store';
import { assign, createMachine } from 'xstate';
import csvStore from '@/stores/csv.store';

const gcsMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QHEBOB7ArgOwgAgGF1sAXDAGzwGUBPWEsAWwGIBpASQBlOBtABgC6iUAAd0sAJYkJxYSAAeiACwAmADQgaiFQHY+AOj5G+ugBxGAzAFYVAX1sa0WXIWJl0lWvSb6JEcmDMAKIAcgCCAEKcQQD6VOwAsgCqnGEAKuwA8iH8QkggYpLSsvmKCACMAGwW+gCc9fVWFipKFjqmlRpaFXxW+lbGfLUtNkpW5Tr2jhg4+ESkFNR0DIy+-oGhkdExAGKc7MgAEmm5coVSMthyZVU1DY3Nre2dmtrlBve1prV8Os2mpimICcs1cCw8S28q0kjEw5AAhsVsDEwNh4QAjALMMIEDIANXSsXiyVSGWyp3y5yR10QlXUrwQOh0tX05Ss1SsVlq5S+pnKSiBIJc83cnmWPhhcMRlxi8IAxtIAG6BKhpMIAJTScUSKXSWRygjO4guJVAZVqVh0+j5FkqtUqfDG7zpXUQ43K+h0dqUpisql0wz4lUFM2FbkWXhW+klCKRsoVEmVzCSAAUACKEmJhThpJK5tNBCmiY3U0pupRKfS2pS9NrlCY-HSuhDjK08pSVSpclQWUxKWoh5xzcMQyMSiSw2My+VKsD6eGwOWoiASbBQZhpdUHZBBdUxAtUAihNPsELIIsFEuXGkIWr960qcq9zm10wqendDqViy1Np2my+nwEyDqCIoRuK0ITlKcYzomc4QHAS64Ku66btuu4xKkIQnmeF5UteZYVM0KjWjYzLWCorYvJ+lTfr+XoWiogHAQ4wKhsO4JilC0ZQVOxDxrOaxYmhyA7nuYSHsep7noalJXqaChuha1q9DoqjlC0XaVE2DJflW9H-kxAwsdMQ5gqKkJRgAZuQEhQAAFiQKJopigQ4vimZ7Acxx4fJVyETYzb2laNbVCoJj2hY1gWPYrHYOgCHwPkQocRZY6MEaRQEWaiAALTUXlfSfI8Kh3paTIgWGnGWT4fgBJlJr+TlCCqM29YekoVRaRadLmMGrEpeZ4HcQwqCMKuiKQA1pbNU+lYqFp9bafytqds2C0sgMRgaXoShMk+lWpcNUYxtK-Gohi9VyVlCllL283lKYOicn6v5DEozZ8v0gx8P83z1gOA3sUNo4QTxk5ncisHKtN2WKS1lEqZaHbmCY7T8s2Oilda9Hsm0WMtIdINcSdvGQwJcHzouy4obDt2IG+Bi2m+tGdRMFhPp9tE43+jHMZMQNmWBoPcadMEJsq+iJUhK5rnTTXw-Wpg1JU5hq5pDoY7p3PfLzAHGQLpmgSOJPjhD4uCQiuBTddjU3myC36Ht7TK891Qfdrla6wx+tAYbbFCybNWQeb04S3OdVgPLN57TU5jI6rRhmFrNFewZfMG0Twum6sNl2Y5zmXVHtszfDFgVlWXK2lYT0E-aBUVB0dT3MrfY13y-uDdnwf6HnDlOdDxfFjdCtlC0LJjBzWmOo0Dd3pWoUc2r7ZPbFthAA */
    id: 'Ground Control System',

    initial: 'idle',
    types: {
      context: {} as MachineContext,
      events: {} as MachineEvent,
    },
    context: {
      csvData: undefined,
      output: '',
      sensorData: {
        acceleration: { values: [], time: [] },
        airPressure: { values: [], time: [] },
        airSpeed: { values: [], time: [] },
        altitude: { values: [], time: [] },
        temperature: { values: [], time: [] },
        batteryVoltage: { values: [], time: [] },
        gpsCoordinates: { values: [], time: [] },
        gyroscope: { values: [], time: [] },
        longitude: { values: [], time: [] },
        satellitesTracked: { values: [], time: [] },
        tiltAngle: { values: [], time: [] },
      },
    },

    states: {
      idle: {
        on: {
          ENABLE_SIMULATION: 'simulation_enable',
          ENABLE_FLIGHT: 'flight_enable',
        },
      },

      terminated: {},

      simulation_enable: {
        entry: 'notifySimulationEnable',

        on: {
          ACTIVATE_SIMULATION: 'simulation_active',
        },
      },

      simulation_active: {
        entry: 'notifySimulationActivated',
        on: {
          START_SIMULATION: {
            actions: ['startCSVProcessing'],
          },
          UPDATE_ALTITUDE: {
            actions: 'updateAltitude',
          },
          UPDATE_TEMPERATURE: {
            actions: 'updateTemperature',
          },
          UPDATE_AIR_SPEED: {
            actions: 'updateAirSpeed',
          },
          UPDATE_AIR_PRESSURE: {
            actions: 'updateAirPressure',
          },
          UPDATE_BATTERY_VOLTAGE: {
            actions: 'updateBatteryVoltage',
          },
          UPDATE_GPS_COORDINATES: {
            actions: 'updateGPSCoordinates',
          },
          UPDATE_TILT_ANGLE: {
            actions: 'updateTiltAngle',
          },
        },
        states: {
          ascending: {
            on: {
              TRIGGER_DESCENDING: 'descending',
            },
          },

          descending: {
            on: {
              TRIGGER_LANDING: 'landed',
            },
          },

          landed: {},
          idle: {
            on: {
              TRIGGER_ASCENDING: 'ascending',
            },
          },
        },

        initial: 'idle',
      },

      flight_enable: {
        entry: 'notifyFlightEnable',
        on: {
          ACTIVATE_FLIGHT: 'flight_active',
        },
      },

      flight_active: {
        entry: 'notifyFlightActive',
      },
    },

    on: {
      KILL: '.terminated',
    },
  },
  {
    actions: {
      notifySimulationEnable: assign(() => {
        return {
          output: 'Simulation Enabled',
        };
      }),
      notifySimulationActivated: assign(({ self }) => {
        self.send({ type: 'START_SIMULATION' });

        return {
          output: 'Simulation Activated',
        };
      }),
      startCSVProcessing: () => {
        const $csvService = get(csvStore);
        $csvService.send({ type: 'START_PROCESS' });
      },

      updateAltitude: assign(({ event, context }) => {
        const {
          data: { time, value },
        } = event as UpdateAltitude;

        return {
          sensorData: {
            ...context.sensorData,
            altitude: {
              values: [...context.sensorData.altitude.values, value.toString()],
              time: [...context.sensorData.altitude.time, time],
            },
          },
        };
      }),
      updateTemperature: assign(({ event, context }) => {
        const {
          data: { time, value },
        } = event as UpdateTemperature;

        return {
          sensorData: {
            ...context.sensorData,
            temperature: {
              values: [
                ...context.sensorData.temperature.values,
                value.toString(),
              ],
              time: [...context.sensorData.temperature.time, time],
            },
          },
        };
      }),
      updateBatteryVoltage: assign(({ event, context }) => {
        const {
          data: { time, value },
        } = event as UpdateBatteryVoltage;

        return {
          sensorData: {
            ...context.sensorData,
            batteryVoltage: {
              values: [
                ...context.sensorData.batteryVoltage.values,
                value.toString(),
              ],
              time: [...context.sensorData.batteryVoltage.time, time],
            },
          },
        };
      }),
      updateAirPressure: assign(({ event, context }) => {
        const {
          data: { time, value },
        } = event as UpdateAirPressure;

        return {
          sensorData: {
            ...context.sensorData,
            airPressure: {
              values: [
                ...context.sensorData.airPressure.values,
                value.toString(),
              ],
              time: [...context.sensorData.airPressure.time, time],
            },
          },
        };
      }),
      updateAirSpeed: assign(({ event, context }) => {
        const {
          data: { time, value },
        } = event as UpdateAirSpeed;

        return {
          sensorData: {
            ...context.sensorData,
            airSpeed: {
              values: [...context.sensorData.airSpeed.values, value.toString()],
              time: [...context.sensorData.airSpeed.time, time],
            },
          },
        };
      }),
      updateGpsCoordinate: assign(({ event, context }) => {
        const {
          data: {
            time,
            value: { x, y, z },
          },
        } = event as UpdateGPSCoordinates;

        return {
          sensorData: {
            ...context.sensorData,
            gpsCoordinates: {
              values: [
                ...context.sensorData.gpsCoordinates.values,
                { x, y, z },
              ],
              time: [...context.sensorData.gpsCoordinates.time, time],
            },
          },
        };
      }),
      updateTiltAngle: assign(({ event, context }) => {
        const {
          data: {
            time,
            value: { x, y, z },
          },
        } = event as UpdateTiltAngle;

        return {
          sensorData: {
            ...context.sensorData,
            tiltAngle: {
              values: [...context.sensorData.tiltAngle.values, { x, y, z }],
              time: [...context.sensorData.tiltAngle.time, time],
            },
          },
        };
      }),
    },
  },
);

export default gcsMachine;
