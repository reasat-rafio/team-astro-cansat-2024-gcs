import type { MachineContext, MachineEvent } from '$lib/@types/app.types';
import { assign, createActor, createMachine } from 'xstate';

const gcsMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QHEBOB7ArgOwgAgGF1sAXDAGzwGUBPWEsAWwGIBpASQBlOBtABgC6iUAAd0sAJYkJxYSAAeiACwAmADQgaiFQHY+AOj5GjADgDMKgKw7dlywF97GtFlyFiZdJVr0m+2ORgYCLMAKIAcgCCAEKcoQD6VOwAsgCqnJEAKuwA8uH8QkggYpLSskWKCACMAGxKhsZWllVVOkpKOhpa1Xz1lsZGOm01AJw6I0qOzhg4+ESkFNR0DIz+gcFhUbEJAGKc7MgAEpkFciVSMthylbX1A00tbR1d2nwj+iOfn70jJiojKj4KimIBcs3cCy8S18q0kjEw5AAhmVsPEwNhEQAjQLMSIEbIANSyCSSaQy2TypyK5xR10QNXUmkQVSMKn0dT4NRqnLaVQsJhBYLc8083mWfjhCORl3iiIAxtIAG5gZipAAKABFifEtZlIlTROILuVQJUapYaoYRmYTJ9WiMqiM+J0mQhLKp9P0jI8zJZfjUzIKZsKPIsfCt-BJ4UiUbKFRJlfpEbA5eiIBJsFBmJkAEoHZChHM60JUAgRDXscLIA3FI20irKSwmfQ6c16PntFomWovHpDfRmJ01EytsxmPhVBxOUHBuahqHhiVRqWx+VKsD6CBwVO4DNZ3P5wvxDLhCtVms0y50hDmKotkajSdKMxtZ0mXss-uDzkjgPjydBq4c6QmKML6AAZuQEhQAAFiQaIYtiKp4oS2p7AcxwXnWV4Nm6jLdC0Tr6LanL+q0XaONO2DoFu8BFEKwGitCKxnNhJoKIgAC0NS9pxlgfF8glCdagHgiKYbirC6wiKxpQ4aayj4cyLT6EotRcgMjomFO0xARCTGLqsDCoIwGbIpAsnGlcuF8paKjmjUVTtJ2nIWL2ugGF6Ri+oCrKiSGIHMUu0bSsQCFYoEln1gpCA2nZVQjm0I4vv8Fq9t2nr3N2Kjjh0gbTgx+kSWBkoxjKa4JmAUXyRxCAqBlZhVFYNgJWp9UjJYvYTGyJFckoJg1DYD5VP5jHFRGpWhaiFWJsmO7ppm1XsZUFjvI1zUqK1TW2p1rqfjoxFDr+Y4Th0o1FQukmRiFq7xomtHzXuS3WTFoxsgy-Q6HyOhmIN-Ufs6B29cd-5nQVs4XaBE3LmVYUzRuSK4BZ1JsS9tUsr6qmbQ+XK1HwtpmAD-bA6OoM6Od4mXWBkHQXB4VIc915mEolq+taHVvCOgJOR+A0CV8Vi+raJjaRT85Q34NOwfB8OM7hKhKO8SiWI1k7NDozTOh+tRA06eicu6Nhg44QA */
    id: 'Ground Control System',

    initial: 'sleep',
    types: {
      context: {} as MachineContext,
      events: {} as MachineEvent,
    },
    context: {
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

    states: {
      sleep: {
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

      updateAcceleration: assign(({ event, context }) => {
        const { acceleration } = event as unknown;
        return {
          acceleration: {
            values: [...context.acceleration.values, acceleration.value],
            time: [...context.acceleration.time, acceleration.time],
          },
        };
      }),
      updateAirPressure: assign(({ event, context }) => {
        const { airPressure } = event as unknown;
        return {
          airPressure: {
            values: [...context.airPressure.values, airPressure.value],
            time: [...context.airPressure.time, airPressure.time],
          },
        };
      }),
      updateAirSpeed: assign(({ event, context }) => {
        const { airSpeed } = event as unknown;
        return {
          airSpeed: {
            values: [...context.airSpeed.values, airSpeed.value],
            time: [...context.airSpeed.time, airSpeed.time],
          },
        };
      }),
      updateAltitude: assign(({ event, context }) => {
        const { altitude } = event as unknown;
        return {
          altitude: {
            values: [...context.altitude.values, altitude.value],
            time: [...context.altitude.time, altitude.time],
          },
        };
      }),
      updateTemperature: assign(({ event, context }) => {
        const { temperature } = event as unknown;
        return {
          temperature: {
            values: [...context.temperature.values, temperature.value],
            time: [...context.temperature.time, temperature.time],
          },
        };
      }),
      updateBatteryVoltage: assign(({ event, context }) => {
        const { batteryVoltage } = event as unknown;
        return {
          batteryVoltage: {
            values: [...context.batteryVoltage.values, batteryVoltage.value],
            time: [...context.batteryVoltage.time, batteryVoltage.time],
          },
        };
      }),
      updateGpsCoordinates: assign(({ event, context }) => {
        const { gpsCoordinates } = event as unknown;
        return {
          gpsCoordinates: {
            values: [...context.gpsCoordinates.values, gpsCoordinates.value],
            time: [...context.gpsCoordinates.time, gpsCoordinates.time],
          },
        };
      }),
      updateGyroscope: assign(({ event, context }) => {
        const { gyroscope } = event as unknown;
        return {
          gyroscope: {
            values: [...context.gyroscope.values, gyroscope.value],
            time: [...context.gyroscope.time, gyroscope.time],
          },
        };
      }),
      updateLongitude: assign(({ event, context }) => {
        const { longitude } = event as unknown;
        return {
          longitude: {
            values: [...context.longitude.values, longitude.value],
            time: [...context.longitude.time, longitude.time],
          },
        };
      }),
      updateSatellitesTracked: assign(({ event, context }) => {
        const { satellitesTracked } = event as unknown;
        return {
          satellitesTracked: {
            values: [
              ...context.satellitesTracked.values,
              satellitesTracked.value,
            ],
            time: [...context.satellitesTracked.time, satellitesTracked.time],
          },
        };
      }),
      updateTiltAngle: assign(({ event, context }) => {
        const { tiltAngle } = event as unknown;
        return {
          tiltAngle: {
            values: [...context.tiltAngle.values, tiltAngle.value],
            time: [...context.tiltAngle.time, tiltAngle.time],
          },
        };
      }),
    },
  },
);

export const gcsService = createActor(gcsMachine).start();
