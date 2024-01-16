import type {
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
    /** @xstate-layout N4IgpgJg5mDOIC5QHEBOB7ArgOwgAgGF1sAXDAGzwGUBPWEsAWwGIBpASQBlOBtABgC6iUAAd0sAJYkJxYSAAeiACwAmADQgaiFQHY+AOj5G+ARgCsADgDMfAGwWdOpQF9nGtFlyFiZdJVr0TPoSEORgzACiAHIAggBCnBEA+lTsALIAqpwxACrsAPJR-EJIIGKS0rKliggmtkqGxia6tnwAnBYmbeqaiCZ8DWZNJp1mVkpjOq7uGDj4RKQU1HQMjMGh4dHxiUkAYpzsyAASOcVy5VIy2HI1dQ3Gpi3tnd0aWggq-Y1GVjoqHXwVGYpm4QB45t5Fn5loE1pJGJhyABDSrYJJgbBIgBGYWYMQIeQAarlkqlMtk8oUzqULqibohbD13p8VINjGYVLYnEorLZbNMwbMvAtfP4VkF4YiUVckkiAMbSABu4SoORiACUcil0llcgUioJzuJLlVQDVrFZ9FYVHxeUMgay2ko3n0OiZ9Do2rYOo47Cp-RYBeDhT4lgFVvpJcjUbKFRJlcwMgAFAAiJKSMU4eRyGRTEWpomNdOqiGsOn0Xv6gKsFgsSiMbRdtVrZn0dZrOms7TGtqDQvmoeh4YlEgR0Zl8qV4WTaZyyTnaSTEXVuQy6vzhppRau9IQL30ZjaNb4HN5A10TZMnbabbafB09jazTLZj7ngHULFsMjo6lMcn8bTqm6YxOw6opEuEQpgWZTbqaCiluM+icmY3rmDyDgjJe3qWkeD6HmYdQmEoSiBqCwYfqKMIRlG0rELGU6JsBc4ZmBSRJuuVBUGuG4lIWFQ7iWe5dAeehWGYShch0XKXoe5YdBMQwmF0EwqFYb4QiKYbinCv7jvRAEJjO6ZxLkc7qgAmkkhL5FmMTILxRoCfB5q2voIw6JY1pXkMthmLJgKGFYJg1uYnYWK0KgaSGn7USOY50WihlAbOyTIEmVBJAQ+T5OqKbsLEc5UDBtKCWapamG2GFWKFTpepe9a2IYna6J8FifFyIIzO+kJUcOukJf+cZGcx85cFqMRRMgiQlXB1xCV2Ho6OJ-SqGp7U6JewUGM0hGMp2EmeSY0WUdp360UNjHGSxqokrNznzeVe5DBWrRtJ6vzmO0TJ9J8DRXjaYw1g47X8uR-a9WdNF6YlDGAUxqXsfirARFq2UZFEpybvxJqPQhwkNH5tjWpJ9ZtB0l7KRYyEjO1wLnk+J2Q0OOk-oNE7DSl6ZpPkeb3bju4WIRHoWE+zRAsFHIWJegIqMhfmHhYpjveTLjgz1Wks+dMOXfD13JEmBBJHmSacPkFlQfzxZPe17rEULQxKG0wLjNLvQIN0TXBaytaMtt3pM5rX7Q+zBmcwj6ZHJlJtmxb0HY7BD2CzabYDErtjmMRd4mE2i3iXh3SckoxFq91mmDsH8V-hzV2jUkaTsFx+pJHkaSOVuScLSnfLFxnzsWqhTbLQ0jWch0-x-F0gcV3FA3V2HteI+lmWt+3OPW-jZZtu1Xo2s0R7KU2xPUxMwWtDyNj-Op6vl7F-Vs-PSXh1QqMtxEMRpEk7Dx3xicCwtwJ9AZz+HoesvJOQ-QQBJOWQwjCEVtMTXkZEy4xT6qzC6NdAL6CRLAOUGIIASGwFAZgOR1SHAcuBPMVACDRHylNK2ZVN4nitLocmxN6gcgpu7T45NkJKRtKyYmThp533QTrTByp9AQDgHg3AhDiGkPIcuJI2Qoh0OQAwlyfQrzU3zpJB0hESKQJ4TeIEjxASSV+KXQUGsZ73wwQvLBIRcSKOQBQjM1DaEFQ0QnUqWiEATHdN7YuD5JJ+SvE2ExfDzGCKsSItB34ABm5AJBQAABYkHRJiHE4R8REnTPsQ4JxNF4xqBySJ3sPSwM7DoO4fJXCgmwOgaR8BSgUWZpXRgTl-5PQALS2CbP074DwRlGC6jY2+CSIzOLAN0jeNRVCU3dL3LkVgnQSTsKoeJUMggMFQIwQhKJIBzMYbcQBphUKsjCp6DoVhIl6APMYH29ReRcjBig06WsQ6PyydiMIJz-E1iam1JwfIuj9E7Lnd0sCfhOj5KhI82yvlV30k-KcALSnaE6FaZoTszyZ1Fv5bhmyqkNlqYCJ8YwkWdIfqiuGkicGyIIUQjFu4uStgcKRB8NZJLnkiV0G8nkYmWOETfVBOy550uSlImR+D5GsqEv0NZ7kHCWFtEeCKD5+W8KFc0CxQjrHtKDrPWlsNpXIlwMcjuPT8YhWxQpEiQs1L1AGdwgVpK9WxNFR8jpJqHFoqcRsBVT1rQ3mCUeVoBLnbasFfw-VcSxWfJpck1JGTfk5ODfjcYXtDyvPaDVf0RL3geWGf6BB4wOjUpNSm9JmTkqZpqI6fQp9lI2E8stXkkSVCi1Jfedq9Z8INOcEAA */
    id: 'Ground Control System',

    initial: 'idle',
    types: {
      context: {} as MachineContext,
      events: {} as MachineEvent,
    },
    context: {
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
