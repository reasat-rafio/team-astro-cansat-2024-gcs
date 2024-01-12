import type { MachineContext, MachineEvent } from '$lib/@types/app.types';
import { get } from 'svelte/store';
import { assign, createMachine } from 'xstate';
import csvStore from '@/stores/csv.store';

const gcsMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QHEBOB7ArgOwgAgGF1sAXDAGzwGUBPWEsAWwGIBpASQBlOBtABgC6iUAAd0sAJYkJxYSAAeiACwAmADQgaiFQHY+AOj5G+SgIymdSkwE4AbAF97GtFlyFiZdJVr0m+iRDkYMwAogByAIIAQpwhAPpU7ACyAKqcEQAq7ADyYfxCSCBiktKyhYoIprZKhsZ8OrYAHACsAMwqLRpalSb6zXUtekqNrTqmjs4YOPhEpBTUdAyM-oHB4dGxcQBinOzIABIZ+XLFUjLYchVVNXX1TW0dzV3apgZ1Fo2NfK1KSrY6ExALmm7jmXgWvmWkkYmHIAENStg4mBsHCAEZBZgRAhZABqmXiiVS6SyuWOhVOiMuiFs6k0iFefBU+mqfFs7Os1hUzWagOBblmnm8iz80NhCPOcThAGNpAA3YJUDIRABKGQSyTSmRyeUEJ3EZzKoCuo2a+m5-T4LWaKlMrSqzwQ7NMfVMbWaSh+DWslj5UwFHnmPiW+jF8MRUtlEgVzBSAAUACIEuJJ5Xk0QGqnlRCNFTWfSmkzVX46HQjR0e5mWpnmdrWPgev2uGaB8HB0USGHhyUy+VgfRw2DSlEQCTYKDMDIqvbIEIqlMhKgEcIJ9hhZDpoqZ87Uno6ZnWV4qFRGRrWYZMx3mZr51r26w8vSNMu5psgwVBkVQzviiO96P9hAcDDrgY4TlOM5znE6RhKu66bpSO7ZpUvxmuebr1PUrRMrYrRXm6t73o+Vovkob4BmCwqQqGP7dsQkZ9ismIQcgs7zhES4rmuG56hS25GgoiBjI0+hnn817NMW9r4TeBZEc0T6keRLaURCIYAGbkBIUAABYkMiqIYsE2J4smOx7IcCH8RcyE2vh9aifWtgerm-RKI2gLYOgQHwIU-IqUKalMPqJRIcaiAALS2I6EVoZy8WmI05h2GYvJOEC-oBZ+1EBEEIWGjZ4UIKo+EumY7I6DyVqmD64zpf5oKBe2ywMKgjBjgikD5VmRV2rY5rObSrzNF8Nrno6ugGNWNX9Oy3INspjXZSGYYSvRKLonlfGhQJFStI0-W2s+tiHpyd6ljojpJX0dSWKMpi2sMi0fm2X40V2a1Iv+CrdWFgkIC5jl-N8z7mKYvxXkyNQjIlXIjDorTOc9rZUSttGfQxAEDkOI5gb9u2IOerT6O5Yz7ftKijAdMn5jDD4KSRnwqMjqnNe9v49lGCr6D5IGjuO+OFf9dpsvo3q4SeD6tPFNOifJilMyzTVvatf5c-28K4F120Fbu1z5pJzmpbYNVVJd9KVARcszQzz6K-VmVLa91Gq5zjG5WAgu7je-VibYINjOYEMW9etPy4zr4O82Tuo34mnaXpBmbZ7Os9f9Pz9a0N77SNI1MzyV7PrURi1thD24Ury1x1pun6d9KcZjtQsVCoSj5u59p3ibrc-La+H-I5bKqIMtWOI4QA */
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
        acceleration: { values: [{ x: 0, y: 0, z: 0 }], time: [] },
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
          UPDATE_DATA: {
            actions: [
              'updateAcceleration',
              'updateAirPressure',
              'updateAirSpeed',
              'updateAirSpeed',
              'updateAltitude',
              'updateTemperature',
              'updateBatteryVoltage',
              'updateGpsCoordinates',
              'updateGpsCoordinates',
              'updateGyroscope',
              'updateLongitude',
              'updateSatellitesTracked',
              'updateTiltAngle',
            ],
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
      notifySimulationActivated: assign(() => {
        const csvService = get(csvStore);
        csvService.send({ type: 'START_PROCESS' });
        return {
          output: 'Simulation Activated',
        };
      }),
      startCSVProcessing: () => {},
      startSimulation: assign(({ context }) => {
        const simData = context.csvData;
        // return { csvData };
      }),

      //   updateAcceleration: assign(({ event, context }) => {
      //     const { acceleration } = event as unknown;
      //     return {
      //       acceleration: {
      //         values: [...context.acceleration.values, acceleration.value],
      //         time: [...context.acceleration.time, acceleration.time],
      //       },
      //     };
      //   }),
      //   updateAirPressure: assign(({ event, context }) => {
      //     const { airPressure } = event as unknown;
      //     return {
      //       airPressure: {
      //         values: [...context.airPressure.values, airPressure.value],
      //         time: [...context.airPressure.time, airPressure.time],
      //       },
      //     };
      //   }),
      //   updateAirSpeed: assign(({ event, context }) => {
      //     const { airSpeed } = event as unknown;
      //     return {
      //       airSpeed: {
      //         values: [...context.airSpeed.values, airSpeed.value],
      //         time: [...context.airSpeed.time, airSpeed.time],
      //       },
      //     };
      //   }),
      //   updateAltitude: assign(({ event, context }) => {
      //     const { altitude } = event as unknown;
      //     return {
      //       altitude: {
      //         values: [...context.altitude.values, altitude.value],
      //         time: [...context.altitude.time, altitude.time],
      //       },
      //     };
      //   }),
      //   updateTemperature: assign(({ event, context }) => {
      //     const { temperature } = event as unknown;
      //     return {
      //       temperature: {
      //         values: [...context.temperature.values, temperature.value],
      //         time: [...context.temperature.time, temperature.time],
      //       },
      //     };
      //   }),
      //   updateBatteryVoltage: assign(({ event, context }) => {
      //     const { batteryVoltage } = event as unknown;
      //     return {
      //       batteryVoltage: {
      //         values: [...context.batteryVoltage.values, batteryVoltage.value],
      //         time: [...context.batteryVoltage.time, batteryVoltage.time],
      //       },
      //     };
      //   }),
      //   updateGpsCoordinates: assign(({ event, context }) => {
      //     const { gpsCoordinates } = event as unknown;
      //     return {
      //       gpsCoordinates: {
      //         values: [...context.gpsCoordinates.values, gpsCoordinates.value],
      //         time: [...context.gpsCoordinates.time, gpsCoordinates.time],
      //       },
      //     };
      //   }),
      //   updateGyroscope: assign(({ event, context }) => {
      //     const { gyroscope } = event as unknown;
      //     return {
      //       gyroscope: {
      //         values: [...context.gyroscope.values, gyroscope.value],
      //         time: [...context.gyroscope.time, gyroscope.time],
      //       },
      //     };
      //   }),
      //   updateLongitude: assign(({ event, context }) => {
      //     const { longitude } = event as unknown;
      //     return {
      //       longitude: {
      //         values: [...context.longitude.values, longitude.value],
      //         time: [...context.longitude.time, longitude.time],
      //       },
      //     };
      //   }),
      //   updateSatellitesTracked: assign(({ event, context }) => {
      //     const { satellitesTracked } = event as unknown;
      //     return {
      //       satellitesTracked: {
      //         values: [
      //           ...context.satellitesTracked.values,
      //           satellitesTracked.value,
      //         ],
      //         time: [...context.satellitesTracked.time, satellitesTracked.time],
      //       },
      //     };
      //   }),
      //   updateTiltAngle: assign(({ event, context }) => {
      //     const { tiltAngle } = event as unknown;
      //     return {
      //       tiltAngle: {
      //         values: [...context.tiltAngle.values, tiltAngle.value],
      //         time: [...context.tiltAngle.time, tiltAngle.time],
      //       },
      //     };
      //   }),
    },
  },
);

export default gcsMachine;
