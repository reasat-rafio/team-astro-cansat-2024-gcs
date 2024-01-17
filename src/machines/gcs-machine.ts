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
    /** @xstate-layout N4IgpgJg5mDOIC5QHEBOB7ArgOwgAgGF1sAXDAGzwGUBPWEsAWwGIBpASQBlOBtABgC6iUAAd0sAJYkJxYSAAeiAKwB2ADQgaiAEwAOAMwA6Pib7a+q7UoBs+gIz6Avo41osuQsTLpKtek2Z2AFkABQB5ACUAFQB9AioANX4hJBAxSWlZVMUEFW07Yz4VPJUTABYVMqKNLQRtMuttQ3N7AE47OyLtFX1rZ1cMHHwiUgpqOgZGQwkIcjBmAFEAOQBBACFOBZiqYIBVThWo9jCl5Ll0qRlsORy7FV1DVqen61abMtb6pRqdbSNTMz6P58CpKXS6fogNxDTyjHzjfxTGZzRarDZbABinHYyAAElEzqkLplrtlEHcHs8Xm9rB8vj8EJ0yoYlKZ9HxXpzunZIdCPCNvL4JkxDJJGJhyABDEkxMDYSUAIxRKwIRwShy2OyC+0Ox1OgnO4kuWVAOWs6k0v1UhmsdlaBn04N0KlaZV5g35XjGfkmook4qlMslAGNpAA3eZUKIraLbPYHI4nQmiI0km6IXRlB5Avh2cFKT7WCytBn5DnNVl8XSNEEuv7u9zDL3wn0isUS6VXGIh8PzeIJGIhCJhAgLKg7JbIOJhUKbKILZNpVNXdMIXSdG02EHAx2qMql3N8ZqtV66DlVMpKHkuKEeptwoWIv0BzvEbuhiQR5i7EIAEQ1MQrJwRxRLsv4LgaRLLiaCgZkoTQnlWZ6ZtYqh3Aydp2My+hlL0p76ARKh2NoDYwgK3rClM7aBl2PafvMP7-vOMTzqECwRIcuwRBBKQphkK5kmuOEsq0vQ2Lola5hh67Zq0Fi0torx8OyJE3ny96CgivrUa+2Dvr235-gBKzsBE2whAsCy-ouxICaaGYfM0qFZkoBG2EoZR2BheRNLheSuQ0dqsm6al3rCmmtlR-odkGH5foxxmmYO3HjlxPGGvxME5AYzKqGYRTVkRFgYY01iGFmnkVLorQqEWomkZ6D5aW20U0W+dHxUZzFrIc84RAAmjECRhMBKzIOlUGZaS9lrnmhh5pU9RFmYTzaBhrlHq5TJ-ARikGA1GkUU+OmxQZCXMcgIRUNOkS-uwqzzlQNnQdNsGzWVma9B8RSiT0XmWoyuG5cUonmtY1XdKpAyNuFR3aa1un6fRhlMVsRzAYBk6bM9U2rpmSiGMUBH2GUWYOBhBEPI0Wb2OYl7Vte0Nkc2j7wy+p3I+dmrRvOOPGq92WoY8RZnnaBisiWAPEWUTTmncVi0mYl4HbDLaUc+MW0XFDFdVsIQqqwCyxAQYS7EsBKQXx-N49orSbra4tvOC-21B0DSE3mNZFAWIIq+RavHQjHOdajMRBGE4F82mgnVmV9zVe8OFYbSGEWEetVKFel4dDY3R+yzzVRezWtnbrg4EDE4EhJwYT9VZUd2W9BhlVhBh2noHy9JLtRvMy671FWro+Xc+dNZFGttXpHU66HuLXVXNd19ZltLrjMf6ATZ703JVbsrYDISQ8EmfCYtV2FeHSjxF6snSXnNl0E7DjnqLHBBNVvRzN4s2rYroKXYtoswMlqghDkfA3h2iIqURmt4Yb+1Zi1Yu7VtYowApda6Rwgjv1XtbGO8FDDgj2m5Wm1YGTWHIY8eC9oTxAl0LbK+cNEGa2QQZKgRsWILBWEEGI7Bl68RwZ-JueQbR3CrBYeCzcLS1Dyo8J44IqjgyzBCUKcCC7j1viw+ihhJSwGDHKCAEhsBQGYFECIOJxpmXAlQUcSw7qTgbllDMG5aHgPXFVS8+4AZ-EcqUEmXxLxmAYQHNmzCp7a0MBAOAejcCGOMaY8x7EYgHFsfdZADiBbkjzEYDenxM5FFJhyUsOE7a+Kwv41kUNYHMzHjfIOd8IzTFmPMeJyALGAWscsOxaSV62UcQgS8ZVaagiIs6Tougik+OUmUjxFSgkIKmAAM3IBIKAAALEgsp5RKnmCqNUAEsQ4nxOk1cxQGRKPKs8eCOZ4KZyUM4G82B0CRPgKkdSqt5kZVwTNbuiAAC0fQVHVOvk+ZEYBPmCJyKoUsdxjAOjyhyF0DQQpM0asC30DBUCMEMdKSA4LG63CvE5XOf12iNEzqWAwLJTDmEsDYewThAWosYUXUJmzFRzDxX0qoBR8jOlKPcW24NvhS2dIUEw+hXSdDeJUt58DC4T0RtPTlGS6jVkMEM+4IDeUb2hdVZoUz2i1XaDhOZ8qNFhN7No3R+jYnKtXODI8zpWR5meHkXoRTWT6r8TMwJjLDrBKYZPJGDTnnRIMUYu1gkmTMgWp5doMtMLWA9UeFo0yPKzL9e8s1dTNENKlLgXFk0vlvQcGq+0MtwZ-CwioKFXiN4pqmTLH1MqwpyvUTmi1WjQWRpmgRbC0tNWNG1cK2ofxPWpqbem31KL-XzMMEslZ6y2XbJ7W9XoBQck4XXLaYiJ4D4FEknaIErIiyvFNePBdayNlKqLRCnQlRypbTBGfSo+YzlC0kq8bQVgCJXjufcoAA */
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
