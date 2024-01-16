import type {
  ImportCsv,
  MachineContext,
  MachineEvent,
  SetTeamId,
  UpdateAirPressure,
  UpdateAirSpeed,
  UpdateAltitude,
  UpdateBatteryVoltage,
  UpdateGPSCoordinates,
  UpdateHsDeployed,
  UpdateMissionTime,
  UpdateMode,
  UpdatePacketCount,
  UpdatePcDeployed,
  UpdateState,
  UpdateTemperature,
  UpdateTiltAngle,
} from '$lib/@types/app.types';
import { get } from 'svelte/store';
import { assign, createMachine } from 'xstate';
import csvStore from '@/stores/csv.store';

const gcsMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QHEBOB7ArgOwgAgGF1sAXDAGzwGUBPWEsAWwGIBpASQBlOBtABgC6iUAAd0sAJYkJxYSAAeiACwAmADQgaiFQHY+AOj5G+ARgCsADgDMfAGwWdOpQF9nGtFlyFiZdJVr0TPoSEORgzACiAHIAggBCnBEA+lTsALIAqpwxACrsAPJR-EJIIGKS0rKliggqAJxK+rZ8ShbNKm06thpaCAC0SnX6FmYmJjomtiqqJnxmtmau7hg4+ESkFNR0DIzBoeHR8YlJAGKc7MgAEjnFcuVSMthyNX0mdQYOZjojduZtFkoeogzFZDLMrDoVHx3roVCorEsQB5Vt4Nn4toFdpJGJhyABDSrYJJgbB4gBGYWYMQIeQAarlkqlMtk8oVbqV7oTnogpkDaiZpvozMYzCpbE4lFZbLZEcivOtfP5tkFsbiCY8kniAMbSABu4SoORiACUcil0llcgUioI7uIHlVQDVrKCrFCpcKVKLBoDNIg3hYTPodHVbHUHHopnCLLKVvKfJsAjt9Kr8YTNTqJPrmBkAAoAEQZSRinDyOQy+Yi7NE9q51UQ1h0+lDsz48IsAKMdT5Jg7ZmGkoc1mhIL4CLcSLjawT6KTKokOLTGu1evCecLOWSm7SuYixtyGWNVdtHNrj25CEDQzMdSsFjm8Oaqh0Pe+Qws7y6H4FjcWE7l05okqmIpguarpiuWZrgWRYxOwxopLuET5tWZRno6CgNlYjRivMdTmIOEwWD2YagreXQ3qMtgmEorSxp4gGKhiyapuqxAZquOYwZuxbwUkuZHlQVCHseJQ1hU571pebxCnoVhmEo4rhuKPY3k24ZKGYwpjA0orjssDGokxc5YmBS7sZB2brkWcS5JuxoAJpJLS+SljEyCiXaEkYc6Y76L2OiWG64zCgsqltoYVgmHe5jfG0bb0SiCqJsqpmLmxRKWdBG7JMguZUEkBD5Pkxr5uwsSblQqGcpJToNqYA53lYMUNKGPZKHYhjfLCvYqJMjiJfGQHMfO6UQZmVncVuXBmjEUTIIk1XoU8UnDsGOjybMqjtroPZRQYApUboIxKIFJiDYxKUgax42cdZPGGgyS3eStdWXsKzbNHUIYQuY0LqH6CACjR-mQnMzUdt1Mr-lORlXSxZkZRxUFcTl-HUqwERmkVGRRDcJ7iQ6r2YdJjQLLYbqKR1dThj2YwWPofUdl6eiqPhF1w7OqWgWNy4TdlRZpPklbPUTF4jEGb5jHCILmB0PZtiojMLDe95vCGDQc8lXPXYjt0o-dyS5gQSSVrmnD5A5yGi3Wb0WH1-mtFpLR1F82HEYDdRivoUXTB2Uz7WGWszsBCO8xZ-Oo0WlwFWbFtWyhBNoS94tQsMLT3tRoyDKYfJrfJ5Fe2KSg0S4MOGdroejeBfN3VNSRpOwQnWkkeRpJ5p4p6tafSiX1Guy68x8htjQdVMYb299fV1MHw0mTzNcR3XaN5QVbcd4Ttsk42wyT1Mpj1FFJh8hTDOaVFT7NW2t6z8Z3M3bXKNUFjrcRDEaRJOwidicnYurV8TRxi6BaGOceANegKSVsKIwoxQHNXsLfeG1dzKZX5voPEsAtQkggBIbAUBmA5GNBcDyCFKxUAINEMq80ba1W3nMH2ugaYU1sJpeoHtejTyGF6A+bZFIQjLgZJKIcRppUXqg1c+gIBwCwbgXB+DCHEL3EkbIUQqHIBoT5f04wGYF0Ul6L0pdwHaDeFw7SUJpgUycIgnWYcxHI31HsSkCjkAkOLOQyh5V1FJxqpohAmkgy+xLl0RSCxxh8k4YzMxvDLECMnBXYR88ABm5AJBQAABYkGJKSCk4RqR0iLGcC41wNHExqKKcJvtgzQO+BMFh0prFVxYOkXMJVsZUFpCUi8fRxQ4VvKYCW5g3jH0BtLMijZWigPvNMVwE5sDoCkfAUoAFOaNK8n-N6fRs6Mz6b2UYgz8J8leFYLh9svglzHNGBSDSRGOLAGsreNRHD+XmF0Cm2EWjnz5G6H20VWqkUzr2a588GCoEYLggkkB7m0JeGMAwIY2yBSiqobSZg+S0SVkYaKxyQxg17kC++esNQknJGEKFvixRDERfUai4oBQbW6CMkGrRZhihdgKaisTlmVxuQ-JeUEyWlO0IGH50xbzNEGR+VFgMoQsKqf06ix01L4t1uHcRUF0GYOwXIgVF5xT9gcK0Lod5FItCMfyGmcqBTRP4cq2xKD7FgEkdIrVeCdVSXBEMAKlgxy3k6AyjhJjLXmL4VY8uQi54EtVQ6-Q+JcCQs7uskm0VhUaVoiMR8ilwmBsCjwixNqw1DTviquxWVblurem6IYgSxWmFGJKrNFqc1WrzaGwRhakG7GSakjJWSSV3ITQ8xAAxpTbJsLssYowDmA02ZLU5jhwxaVhDoW1QQu3pMyVlctJNRX6HPmMGwgUNpSnCR0Sl1T7YdQojM5wQA */
    id: 'Ground Control System',

    initial: 'idle',
    types: {
      context: {} as MachineContext,
      events: {} as MachineEvent,
    },
    context: {
      steps: {
        calibrateTelemetry: 'notStarted',
        importCSV: 'notStarted',
        currentTimeSetFromGPS: 'notStarted',
        simulationActivate: 'notStarted',
        simulationEnable: 'notStarted',
        telemetryStarted: 'notStarted',
      },
      state: 'idle',
      mode: 'idle',
      output: '',
      teamId: '',
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
        gpsTime: [],
        missionTime: [],
        packetCount: '0',
        hSDeployed: false,
        pcDeployed: false,
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
        entry: ['notifySimulationEnable', 'enableSimulation'],

        on: {
          ACTIVATE_SIMULATION: 'simulation_active',
        },
      },

      simulation_active: {
        entry: ['notifySimulationActivated', 'activateSimulation'],
        on: {
          START_SIMULATION: {
            actions: ['startCSVProcessing'],
          },
          CSV_PROCESSING_COMPLETE: {
            actions: assign(({ context }) => {
              return {
                steps: {
                  ...context.steps,
                  simulationActivate: 'done',
                },
              };
            }),
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
          UPDATE_MODE: {
            actions: 'updateMode',
          },
          UPDATE_PC_DEPLOYED: {
            actions: 'updatePCDeployed',
          },
          UPDATE_HS_DEPLOYED: {
            actions: 'updateHSDeployed',
          },
          UPDATE_MISSION_TIME: {
            actions: 'updateMissionTime',
          },
          UPDATE_GPS_TIME: {
            actions: 'updateGpsTime',
          },
          SET_TEAM_ID: {
            actions: assign(({ event }) => {
              const { data } = event as SetTeamId;
              return { teamId: data };
            }),
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
      IMPORT_CSV: {
        target: '#Ground Control System',
        actions: ['importCSV'],
      },
    },
  },
  {
    actions: {
      importCSV: assign(({ context, event }) => {
        const { status } = event as ImportCsv;

        return {
          steps: {
            ...context.steps,
            importCSV: status,
          },
        };
      }),
      notifySimulationEnable: assign(() => {
        return {
          output: 'Simulation Enabled',
        };
      }),

      enableSimulation: assign(({ context }) => {
        return {
          steps: {
            ...context.steps,
            simulationEnable: 'done',
          },
        };
      }),

      notifySimulationActivated: assign(({ self }) => {
        self.send({ type: 'START_SIMULATION' });

        return {
          output: 'Simulation Activated',
        };
      }),
      activateSimulation: assign(({ context }) => {
        return {
          steps: {
            ...context.steps,
            simulationActivate: 'inProgress',
          },
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

      updateMode: assign(({ event }) => {
        const { data } = event as UpdateMode;
        return {
          state: data,
        };
      }),

      updatePCDeployed: assign(({ event, context }) => {
        const { data } = event as UpdatePcDeployed;
        return {
          sensorData: {
            ...context.sensorData,
            pcDeployed: data,
          },
        };
      }),

      updateHSDeployed: assign(({ event, context }) => {
        const { data } = event as UpdateHsDeployed;
        return {
          sensorData: {
            ...context.sensorData,
            hSDeployed: data,
          },
        };
      }),
      updateMissionTime: assign(({ event, context }) => {
        const { data } = event as UpdateMissionTime;
        return {
          sensorData: {
            ...context.sensorData,
            missionTime: [...context.sensorData.missionTime, data],
          },
        };
      }),

      updateGpsTime: assign(({ event, context }) => {
        const { data } = event as UpdateMissionTime;
        return {
          sensorData: {
            ...context.sensorData,
            gpsTime: [...context.sensorData.gpsTime, data],
          },
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
