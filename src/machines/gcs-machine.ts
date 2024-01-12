import type { MachineContext, MachineEvent } from '$lib/@types/app.types';
import { assign, createMachine } from 'xstate';

const gcsMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QHEBOB7ArgOwgAgGF1sAXDAGzwGUBPWEsAWwGIBpASQBlOBtABgC6iUAAd0sAJYkJxYSAAeiACwAmADQgaiFQDYAnADo9xvQA4A7EqXmVK0wF97GtFlyFiZdJVr0mBiRDkYMwAogByAIIAQpwhAPpU7ACyAKqcEQAq7ADyYfxCSCBiktKyhYoIAIw6SgZ89fU6AMx8AKxKpqZ65hpaVXy1rQ2Vrebm3d2djs4YOPhEpBTUdAyM-oHB4dGxcQBinOzIABIZ+XLFUjLYchXVtQ2NLe2d3b3alXx1w6aVLTqtOkqSmmIBcc3ciy8y18a0kjEw5AAhqVsHEwNhEQAjILMCIELIANUy8USqXSWVyZ0KFxRN0QOnUmkQHz4KgMNT4OjaljGA3MILBbgWnm8Kz8cIRyKucURAGNpAA3YIpAAKABFiXENRkIlTROJLmVQBV-jo6nomj9qmZ9DodG8EO02UoTOYdOZKnoVC7WgLZkKPEsfKsDBKkSiZfKJEqDIjYLL0RAJNgoMwMgAlQ7IELprUhKgEcJq9hhZB6ooG2nlZStUwGN0A2xKD4MpQ1B0fMYGJp6Tl8D1mIb8pyg-3zQNQ4PiiTw8PSuWKsAGCBwBO4ZOpjNZnNxdJhYul8s0q50hCmJqVet6HRdG9NZudVod-vmbu9rkD0xDv2uceQ0UwgYABm5ASFAAAWJBohi2LBHihKavshwnEelYntWjqMn0lSep8XRtBafBNLYtiVI4I7YOgK7wIUgp-iK0KrOcaFGgoiAALT2kyCCcV8Dz8fUdg-uCwpBmKawBEEzElOhxrKFh2gDHU55NACozmF0zY6MJAb-oxfgMKgjDJsikDSYa1wYb8Zq6ACLRNG6uiaQ6KjmJ8LrGBYVg2EJI50RCDFTrCM6ShG6JYlJ1IsZZckIJaNmVBYozGA5HRNA6PwGB5Ji6LZVjaX5Y4BWJgFhlKxCRou5lVrFdiXhe3p6K0Hy-ACIwOnoqgGPhrTdKpQJtsOMy-sVk7iaGIVzhVC7RkucZrkmKbVbJbFxSohgNT6LWqYCT7cZ2r74R+npfv2On0SVIZlRGM0xtRC0bstrEml67IqEMugui0fA-M+XZHf2J3foVI2iWNpWTeVqK3UuSK4GZUUyc9zJEa0WUqJ6tb6FYSgOX9h3voDg5nSDIkTgBIYgWBkHQRFYBPTFq33maqkWhaQyEd6HYWHx9TVK1lR2MCpO6YF41UxBUEwwzp6NVlrQNZyPaJQrXHYdUBPcv8Iz9hY5H2EAA */
    id: 'Ground Control System',

    initial: 'idle',
    types: {
      context: {} as MachineContext,
      events: {} as MachineEvent,
    },
    context: {
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
        },

        initial: 'ascending',
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
      notifySimulationEnable: () => {
        console.log('Simulation Enabled');
      },
      notifySimulationActivated: () => {
        console.log('Simulation Activated');
      },

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
