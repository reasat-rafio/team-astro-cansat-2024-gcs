import type { MachineContext, MachineEvent } from '$lib/@types/app.types';
import { assign, createMachine } from 'xstate';

const gcsMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QHEBOB7ArgOwgAgGF1sAXDAGzwGUBPWEsAWwGIBpASQBlOBtABgC6iUAAd0sAJYkJxYSAAeiACwAmADQgaiFQHY+AOj5G+SgIymdSkwE4AbAF97GtFlyFiZdJVr0m+iRDkYMwAogByAIIAQpwhAPpU7ACyAKqcEQAq7ADyYfxCSCBiktKyhYoIprZKhsZ8OrYAHACsAMwqLRpalSb6zXUtekqNrTqmjs4YOPhEpBTUdAyM-oHB4dGxcQBinOzIABIZ+XLFUjLYchVVNXX1TW0dzV3apgZ1Fo2NfK1KSrY6ExALmm7jmXgWvmWkkYmHIAENStg4mBsHCAEZBZgRAhZABqmXiiVS6SyuWOhVOiMuiFs6k0iFefBU+mqfFs7Os1hUzWagOBblmnm8iz80NhCPOcThAGNpAA3YIAJRCEQAIttFdkknECFRceTROIzmVQBUHvolNYWo1bK1Wo1TNYxs8ELTbPoVKYRqM2qNHY0+VMBR55j4lvoxfDEVLZRIFcwUgAFVUEuIpjIRA1FI1U8qIRoqaz6H0maq-HQ6EYu5qqPrGT2mdrWPg1wOuGYh8Fh0USGFRyUy+VgfRw2DSlEQCTYKDMDKKvbIEKKtMhKgEcKq9hhZBZynnakIOw1Vr-PR8Uwqe2NJStF3mUzH17NaqfZqXpltkGC0MiqG98XRoOcbDhAcDjrgU4znOC5LnE6RhJu267jm+55pUdo6MWVpWmM9Q3i2d7mI+LYvi075KJ+wZgsKkIRv+-bEDGQ4rJi0HIIuy4RGuG5bjuggnChJoKDSrzFm+fDWKYzTNteOi3vSlREcWT6kW+rQmJRHbURC4YAGbkBIUAABYkMiqIYsE2J4qmOx7IcyElKhpqIG+hHNvojTNrYNYFv0SitoC2DoKB8CFPyWlCjpTACY5QkVAAtLYLrxc0+iculVSfPUrRcg4ThAkGEU-rRARBDFxoXGhqiEaYFpVP8PJ8A6TrjPl4WgpF3bLAwqCMFOCKQOVubOeh7oqN5tJPl8b7WEoLq6AY-RGI6-TstyLaaR1xXhpGEqMSi6JlRSgmVSN9pjV6DSSZyGEVi6Dp1sYlh+p6wybd+Xa-nRfZ7UiQEKkNTnCQgvwGK04kjM2PJev8LpOkWDotjo3LNHo3IqO9nY0Tt9G-UxwEjmOE6QYDcX5j8aUPrYXpmP8BbWDVNSI8+wxkepGNtYVW2fbRu2AbGCr6CF4GTtOpOncD5hWh6ujmJ6hZfHNCn3kzKms2pH6c+23PYz2P388x8K4INx2xRLVw1rVTJWJ60m2ioTWMx5auvu+HOTNrH263++sDgLw6lWA4sHqzYkO5DLbNDDOhO8zqlu5j2ldfo+mGSZZmHUHpsVQePzuuD1j2s01qfCjd6NJh7yNupF62onnVfanxmmf9WeGmbB4qJaFptNX1Ndz8nqEf8HleaogwtY4jhAA */
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
          STORE_CSV_DATA: {
            actions: 'storeCsvData',
          },
          START_SIMULATION: {
            actions: 'startSimulation',
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
        return {
          output: 'Simulation Activated',
        };
      }),
      storeCsvData: assign(({ event }) => {
        const { csvData } = event as unknown;
        return { csvData };
      }),
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
