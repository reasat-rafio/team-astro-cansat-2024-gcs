import type { MissionData } from '@/lib/@types/app.types';
import gcsStore from '@/stores/gcs.store';
import { get } from 'svelte/store';
import { assign, createMachine } from 'xstate';

type ImportCSV = { type: 'IMPORT_CSV'; data: string[][] };
type UpdateStream = { type: 'UPDATE_STREAM'; data: string };
type MachineEvent =
  | ImportCSV
  | UpdateStream
  | { type: 'PROCESS_COMPLETE' }
  | { type: 'COMPLETE' }
  | { type: 'START_PROCESS' };

const csvProcessingMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGNYDcAKAnA9susAlgHZQB0hEANmAMQCSAshgPIBKAKgPoDCAygDUA2gAYAuolAAHHEQAuhHMUkgAHogCMANgDMZAJyHDO-ToDsG0wA4ALABoQAT00izZM2Z02ATAFZXGiJa3jreAL5hDqiYuPiwRKRk0VyEsFywcjhYkLR8HACCnFwYbCw8AKJ8fKISSCAy8orKdeoIvh5kNr46Ivq+3hoa7TpWDs4IA1oGRlb+WhrmNlpmEVHo2HgEJORSsVuktDwszAAy5RzlNSoNhApKKq1WWiJkVt5WIjb63jaW775jTQ9TozGwiXzzMzeLS+VYgaIbOIJHZ7eLbWgAVQwABF8hcuHlyvlGFc6jc7s1QK0Rr4yBofvovs95lZBoCEABaDRWdz+EQ9SxmX42EwRSIgYg4CBwFQI1HI66yW5NB6IDladlcoJkPwifkiQXC0XiuWbNGJSg0RWNe4tRA+dkLF5GfS2cGQ6Gwk3reXbJLoFJpDJZSDW5W2qmIUJ6Rb6MwiAZDTxmR06DRkPWZ8EDfVWOGmpF+3ZmhVkpUU1UIZ76OkMplBblspyIVkgwyzBuLZb5n0lv3IHAAWykNDkobLNspahc2qWTze+mrOl8+kd3hrQvbtisO+0vhsYrCQA */
    id: 'csvProcessing',
    initial: 'idle',
    types: {
      context: {} as {
        csvData: string[][];
        currentIndex: number;
        intervalId: NodeJS.Timeout | null;
        streams: string[];
      },
      events: {} as MachineEvent,
    },
    context: {
      csvData: [],
      currentIndex: 1,
      intervalId: null,
      streams: [],
    },
    states: {
      idle: {
        on: {
          IMPORT_CSV: {
            actions: 'saveCSVData',
            target: 'csv_is_stored',
            reenter: true,
          },
        },
      },

      csv_is_stored: {
        on: {
          START_PROCESS: 'processing',
        },
      },

      processing: {
        on: {
          COMPLETE: 'completed',
          UPDATE_STREAM: {
            target: 'processing',
            actions: 'updateStream',
          },
        },
        entry: 'startProcessing',
        exit: 'stopProcessing',
      },
      completed: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      saveCSVData: assign(({ event }) => {
        const { data } = event as ImportCSV;
        return { csvData: data };
      }),

      startProcessing: ({ context, self }) => {
        context.intervalId = setInterval(() => {
          if (context.currentIndex < context.csvData.length) {
            const currentLine = context.csvData[context.currentIndex];
            const headerRow = context.csvData[0];

            const lineObject: unknown = {};
            headerRow.forEach((columnName, index) => {
              lineObject[columnName] = currentLine[index];
            });

            self.send({ type: 'UPDATE_STREAM', data: currentLine.join(',') });
            updateSeonsorData(lineObject as MissionData);

            console.log('Processing line:', lineObject);

            context.currentIndex++;
          } else {
            clearInterval(context.intervalId as NodeJS.Timeout);
            context.intervalId = null;
            console.log('Processing complete');
          }
        }, 1000);
      },
      stopProcessing: ({ context }) => {
        clearInterval(context.intervalId as NodeJS.Timeout);
        context.intervalId = null;
        console.log('Processing complete');
      },

      updateStream: assign(({ context, event }) => {
        const { data } = event as UpdateStream;
        return {
          streams: [...context.streams, data],
        };
      }),
    },
  },
);

export default csvProcessingMachine;

function updateSeonsorData(data: MissionData) {
  const $gcsService = get(gcsStore);

  const {
    ALTITUDE,
    TEMPERATURE,
    AIR_SPEED,
    PRESSURE,
    VOLTAGE,
    GPS_LONGITUDE,
    GPS_LATITUDE,
    GPS_ALTITUDE,
    TILT_X,
    TILT_Y,
    ROT_Z,
    MISSION_TIME,
    STATE,
    PACKET_COUNT,
    MODE,
    HS_DEPLOYED,
    PC_DEPLOYED,
    TEAM_ID,
    GPS_TIME,
    GPS_SATS,
  } = data;

  $gcsService.send({
    type: 'UPDATE_MISSION_TIME',
    data: MISSION_TIME,
  });
  $gcsService.send({
    type: 'UPDATE_GPS_TIME',
    data: GPS_TIME,
  });
  $gcsService.send({
    type: 'SET_TEAM_ID',
    data: TEAM_ID,
  });
  $gcsService.send({
    type: 'UPDATE_ALTITUDE',
    data: { value: ALTITUDE, time: MISSION_TIME },
  });
  $gcsService.send({
    type: 'UPDATE_TEMPERATURE',
    data: { value: TEMPERATURE, time: MISSION_TIME },
  });
  $gcsService.send({
    type: 'UPDATE_AIR_SPEED',
    data: { value: AIR_SPEED, time: MISSION_TIME },
  });
  $gcsService.send({
    type: 'UPDATE_AIR_PRESSURE',
    data: { value: PRESSURE, time: MISSION_TIME },
  });
  $gcsService.send({
    type: 'UPDATE_BATTERY_VOLTAGE',
    data: { value: VOLTAGE, time: MISSION_TIME },
  });
  $gcsService.send({
    type: 'UPDATE_STATE',
    data: STATE,
  });
  $gcsService.send({
    type: 'UPDATE_MODE',
    data: MODE,
  });
  $gcsService.send({
    type: 'UPDATE_HS_DEPLOYED',
    data: Boolean(HS_DEPLOYED),
  });
  $gcsService.send({
    type: 'UPDATE_PC_DEPLOYED',
    data: Boolean(PC_DEPLOYED),
  });
  $gcsService.send({
    type: 'UPDATE_PACKET_COUNT',
    data: PACKET_COUNT,
  });
  $gcsService.send({
    type: 'UPDATE_GPS_COORDINATES',
    data: {
      value: { x: GPS_LONGITUDE, y: GPS_LATITUDE, z: GPS_ALTITUDE },
      time: MISSION_TIME,
    },
  });
  $gcsService.send({
    type: 'UPDATE_TILT_ANGLE',
    data: {
      value: { x: TILT_X, y: TILT_Y, z: ROT_Z },
      time: MISSION_TIME,
    },
  });
}
