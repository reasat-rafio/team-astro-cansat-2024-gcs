import type {
  MachineContext,
  MachineEvent,
  UpdateAcceleration,
  UpdateAirPressure,
  UpdateAirSpeed,
  UpdateAltitude,
  UpdateBatteryVoltage,
  UpdateGpsCoordinates,
  UpdateGyroscope,
  UpdateLongitude,
  UpdateSatellitesTracked,
  UpdateTemperature,
  UpdateTiltAngle
} from '$lib/@types/app.types';
import { assign, createActor, createMachine } from 'xstate';

const gcsMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QHEBOB7ArgOwgAgGF1sAXDAGzwGUBPWEsAWwGIBpASQBlOBtABgC6iUAAd0sAJYkJxYSAAeiACwAmADQgaiAIx8A7ADYAdAA4l27UoCsJgMz2HAX0ca0WXIWJl0lWvSZGsORgYCLMAIIEACrsAGrhUQCi-EJIIGKS0rJpigjaBgCcGlp52rZWpuaWNg5OLiBuOPhEpBTUdAyMRqg42BLYUMwAqgAKACIJiQD6kQSJnIkASgnsAPIAcilyGVIy2HK5tip6RlYGKlbFOnzmRny22hfOrhhNnq0+7f5dPdh9A8NxpMZuxFlMRotElQqENIVs0jssvscoh7HwjNYHhcrggCtY7noTI8rM8Gq8PC1vL4OgFfv9BqMJkkQWCqCNEokxvDROJdtlQId8ZYzLY9JdNIgzAUjMTSY0KV42n5Ot1ev0GUDmeFODEokMxslBNteUiDqilCZKqLxSUxbYZXptCYxXLyc1FZ9lbS1QDGcCkgBZdnLPVwo0Ik17M0INEYwxnbEShAGKwnFROl31eXuj7U76qv7qwFM6YAIQSSUWAE0prFVjrwshDakeZkoyiY5YCfdiTiztojCoU+cSVm3e8qV8VXSi37mcgRlQpgRVqtFmN2OtJlRuelI-yFKjHkY9EOEzblCmjFjRy93DnJ16fj6NSWpsgq4tVlQV+zd4j2wFVFbEtC8Y0Ka8rAKa1XXvCclRpZ9C19TVpk4DZkHYPUDX-fdkSAmNbkdPhoLFHFjntJQ+BHWC3kpBD8xnFC3yoSZuCwqEpiiZYCFYTlcLbA9Dj4FRThHHFtD0E5MVlMc4Poz1EILeli39LgohmdZkAWAS+Xww9CIHYdExKIlTmcepsHQCA4DkbN4MU75jUE-TcgAWgMHEPNohVcynAIghCERnL06NVAk7QoLuAwpL4OxansHyHwY6cXxC00O1sJQTlIsCLFuAoRUzO86I9PMVQYVBGH6ABDBgIHSwCDPyIok10KTryqax4tqCzHCAA */
    id: 'Ground Control System',

    initial: 'sleep',
    types: {
      context: {} as MachineContext,
      events: {} as MachineEvent
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
      tiltAngle: { values: [], time: [] }
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
          UPDATE_ACCELERATION: {
            actions: 'updateAcceleration'
          },
          UPDATE_AIR_PRESSURE: {
            actions: 'updateAirPressure'
          },
          UPDATE_AIR_SPEED: {
            actions: 'updateAirSpeed'
          },
          UPDATE_ALTITUDE: {
            actions: 'updateAltitude'
          },
          UPDATE_TEMPERATURE: {
            actions: 'updateTemperature'
          },
          UPDATE_BATTERY_VOLTAGE: {
            actions: 'updateBatteryVoltage'
          },
          UPDATE_GPS_COORDINATES: {
            actions: 'updateGpsCoordinates'
          },
          UPDATE_GYROSCOPE: {
            actions: 'updateGyroscope'
          },
          UPDATE_LONGITUDE: {
            actions: 'updateLongitude'
          },
          UPDATE_SATELLITES_TRACKED: {
            actions: 'updateSatellitesTracked'
          },
          UPDATE_TILT_ANGLE: {
            actions: 'updateTiltAngle'
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
      updateAcceleration: assign(({ event, context }) => {
        const { acceleration } = event as UpdateAcceleration;
        return {
          acceleration: {
            values: [...context.acceleration.values, acceleration.value],
            time: [...context.acceleration.time, acceleration.time]
          }
        };
      }),
      updateAirPressure: assign(({ event, context }) => {
        const { airPressure } = event as UpdateAirPressure;
        return {
          airPressure: {
            values: [...context.airPressure.values, airPressure.value],
            time: [...context.airPressure.time, airPressure.time]
          }
        };
      }),
      updateAirSpeed: assign(({ event, context }) => {
        const { airSpeed } = event as UpdateAirSpeed;
        return {
          airSpeed: {
            values: [...context.airSpeed.values, airSpeed.value],
            time: [...context.airSpeed.time, airSpeed.time]
          }
        };
      }),
      updateAltitude: assign(({ event, context }) => {
        const { altitude } = event as UpdateAltitude;
        return {
          altitude: {
            values: [...context.altitude.values, altitude.value],
            time: [...context.altitude.time, altitude.time]
          }
        };
      }),
      updateTemperature: assign(({ event, context }) => {
        const { temperature } = event as UpdateTemperature;
        return {
          temperature: {
            values: [...context.temperature.values, temperature.value],
            time: [...context.temperature.time, temperature.time]
          }
        };
      }),
      updateBatteryVoltage: assign(({ event, context }) => {
        const { batteryVoltage } = event as UpdateBatteryVoltage;
        return {
          batteryVoltage: {
            values: [...context.batteryVoltage.values, batteryVoltage.value],
            time: [...context.batteryVoltage.time, batteryVoltage.time]
          }
        };
      }),
      updateGpsCoordinates: assign(({ event, context }) => {
        const { gpsCoordinates } = event as UpdateGpsCoordinates;
        return {
          gpsCoordinates: {
            values: [...context.gpsCoordinates.values, gpsCoordinates.value],
            time: [...context.gpsCoordinates.time, gpsCoordinates.time]
          }
        };
      }),
      updateGyroscope: assign(({ event, context }) => {
        const { gyroscope } = event as UpdateGyroscope;
        return {
          gyroscope: {
            values: [...context.gyroscope.values, gyroscope.value],
            time: [...context.gyroscope.time, gyroscope.time]
          }
        };
      }),
      updateLongitude: assign(({ event, context }) => {
        const { longitude } = event as UpdateLongitude;
        return {
          longitude: {
            values: [...context.longitude.values, longitude.value],
            time: [...context.longitude.time, longitude.time]
          }
        };
      }),
      updateSatellitesTracked: assign(({ event, context }) => {
        const { satellitesTracked } = event as UpdateSatellitesTracked;
        return {
          satellitesTracked: {
            values: [
              ...context.satellitesTracked.values,
              satellitesTracked.value
            ],
            time: [...context.satellitesTracked.time, satellitesTracked.time]
          }
        };
      }),
      updateTiltAngle: assign(({ event, context }) => {
        const { tiltAngle } = event as UpdateTiltAngle;
        return {
          tiltAngle: {
            values: [...context.tiltAngle.values, tiltAngle.value],
            time: [...context.tiltAngle.time, tiltAngle.time]
          }
        };
      })
    }
  }
);

export const gcsService = createActor(gcsMachine).start();
