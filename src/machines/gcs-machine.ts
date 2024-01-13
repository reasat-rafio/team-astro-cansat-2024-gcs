import type {
  MachineContext,
  MachineEvent,
  UpdateAirPressure,
  UpdateAirSpeed,
  UpdateAltitude,
  UpdateBatteryVoltage,
  UpdateGPSCoordinates,
  UpdatePacketCount,
  UpdateState,
  UpdateTemperature,
  UpdateTiltAngle,
} from '$lib/@types/app.types';
import { get } from 'svelte/store';
import { assign, createMachine } from 'xstate';
import csvStore from '@/stores/csv.store';

const gcsMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QHEBOB7ArgOwgAgGF1sAXDAGzwGUBPWEsAWwGIBpASQBlOBtABgC6iUAAd0sAJYkJxYSAAeiACwAmADQgaiFQHY+AOj5G+KgIwBWAJy6VKywF97GtFlyFiZdJVr0m+iRDkYMwAogByAIIAQpwhAPpU7ACyAKqcEQAq7ADyYfxCSCBiktKyhYoIpgBsAMz6lg0NVaqmAByWSuZKGlqVfEr65sZ8reamfLVVOo7OGDj4RKQU1HQMjP6BweHRsXEAYpzsyAASGflyxVIy2HIV1XWNTS3tnd2a2uOGw6Y1ulNVrSUMxALnm7iWXhWvnWkkYmHIAENStg4mBsAiAEZBZgRAhZABqmXiiVS6SyuXOhUuyNuiCq6nelRq5iq+laOjGbVapksOm5rWBoLci083lWflh8KR1ziCIAxtIAG7BKgZCIAJQyCWSaUyOTyggu4iuZVAFVaNTqvxM3KUrRMpjsPUQjtMA1MOh5OiUfKUlu9grmwo8yx8a30ksRyNlCokyuYKQACgARIlxCKcLIZFLJkKU0TGmnlRAWnT1Kp8Sx8cytXRuyzOyqmNr6MytC3tKpVmp8aZOEFBhYhyFhiUSOFRmXypXBJOpjLxBdJRMhdWZFLqvOGqmF660hDcyyDSw1T3Wat6D2N8a2VtVcx6GoWU8qIH9oVDiFi6ER8dS6PTnGs4pmmETsOqCQriEyb5kUu6mgoJY1AMKj3lYdrIQ0bqNtYrJPioLI6JagIeqYgauJ+opQuGkbSsQMYzgmIELum4FxImm5UFQG5bgUBYlHuxYHjygx6Lo5hjLop4NoyFoGMyHRPuYKhPuMb6zBR4JUaOMJ-pO9GAfGc5plEmQLuqACacT4tkmYRMgvFGgJCHmnwdRtN6tSXhaymNkRAxKBMdgPr29qnuRYIiqG4q6ROdEooZwHzvEyCJlQcQENk2Tqsm7CRAuVCwdSglmiWfCmGyfqeqoQxutUja1K0+idEpljtK+vIRcGX7UWOcUAbGRnMYuXBahEYTILERXwTcQlyfoOj+UYKgWtUqGNl0KiDMYr69meJhdZR0U-rRA0zvoCKwHKaIQBI2BQMwGTqkcDkQbmVAEOEuUTdNzmzaVB7VvovyHqM9KWDW5jXn6FX0mMNT3iYdgTIdWnHTRenxQxQH6BAcDXbgd0PU9L2rnE6RhN9yC-Sa-2IU2fLA1YNSWGtNT2qo0NPvocM-IjthVlUqNRSOMW-v1U6DWAGzYiTyCvemH1fXl1PbvxtP7p0FX4RJKhuUojqtFzsMEXzQwCyj76Dmjos-gAZuQEhQAAFiQqLoliwS4gSaYHEcpw00WAO+YyFidPojpjBWtYs46b79tg6B4-AhQfjb35rE5GtCQAtFUjZ58Lw4Z34ARBFnQf05zofNs11RTKhugQ26fYaZFxe9esDCoIwd1IpAFclfTfN3iytjVHoow1I2ugGEMy0WNYOgC0XPU6eL-4ymimLlzuf37uzrJtjoVTjOY7PlUbskVfPRhKK8EyVq3A6aSLJexZvBlS4PLnaNywORz1tWcYJ8LDXjsGWSOzZqxPANqvbSYtTqS3OpdAmt17o-zphUKY5g2QchGG6WwHIphcy2lAhG5tkZCytq-Du68kFf3OsnNBRNMH7nGCzCO7JdZ+hUlUfOodeER1NhQpGgt4Hoz6p-BKUt9CIlwAPPe2cAY-H-m1P0iMlAQ1fFDQRvxhHw35lQiRtsMYS0YTjMuYA2FCV+EeHWQCxi9lPro3obp9HkKMeImh7c15iwdk7V27sd7WKUZXCoyE8LM15CfCGJ9ATXlaKyR4vI6zjGbCY9++gAkuzdolGxAMOrNXPqotq9Jl52mvMpMhIj2hJI5AKRw9ggA */
    id: 'Ground Control System',

    initial: 'idle',
    types: {
      context: {} as MachineContext,
      events: {} as MachineEvent,
    },
    context: {
      state: 'idle',
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
        packetCount: '0',
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
          UPDATE_STATE: {
            actions: 'updateState',
          },
          UPDATE_PACKET_COUNT: {
            actions: 'updatePacketCount',
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
      updateGPSCoordinates: assign(({ event, context }) => {
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

      updateState: assign(({ event }) => {
        const { data } = event as UpdateState;
        return {
          state: data,
        };
      }),

      updatePacketCount: assign(({ event, context }) => {
        const { data } = event as UpdatePacketCount;
        return {
          sensorData: {
            ...context.sensorData,
            packetCount: data,
          },
        };
      }),
    },
  },
);

export default gcsMachine;
