import type csvProcessingMachine from '@/machines/csv-machine';
import type gcsMachine from '@/machines/gcs-machine';
import type terminalMachine from '@/machines/terminal-machine';
import type { Readable } from 'svelte/store';
import type { ActorRefFrom, EventFrom, SnapshotFrom } from 'xstate';

interface StringArrayData {
  values: string[];
  time: string[];
}

interface XYZNumberArrayData {
  values: { x: number; y: number; z: number }[];
  time: string[];
}

export interface StringData {
  value: string;
  time: string;
}

export interface XYZNumberData {
  value: { x: number; y: number; z: number };
  time: string;
}

export interface MachineContext {
  csvData?: string[][][];
  output: string;
  sensorData: {
    acceleration: XYZNumberArrayData;
    airPressure: StringArrayData;
    airSpeed: StringArrayData;
    altitude: StringArrayData;
    temperature: StringArrayData;
    batteryVoltage: StringArrayData;
    gpsCoordinates: StringArrayData;
    gyroscope: XYZNumberArrayData;
    longitude: StringArrayData;
    satellitesTracked: StringArrayData;
    tiltAngle: StringArrayData;
  };
}

export type MachineEvent =
  | { type: 'ENABLE_SIMULATION' }
  | { type: 'ENABLE_FLIGHT' }
  | { type: 'ACTIVATE_SIMULATION' }
  | { type: 'ACTIVATE_FLIGHT' }
  | { type: 'TRIGGER_DESCENDING' }
  | { type: 'TRIGGER_LANDING' }
  | { type: 'UPDATE_DATA'; data: MachineData }
  | { type: 'KILL' };

interface MachineData {
  acceleration?: XYZNumberData;
  airPressure: StringData;
  airSpeed: StringData;
  altitude: StringData;
  temperature: StringData;
  batteryVoltage: StringData;
  gpsCoordinates: StringData;
  longitude: StringData;
  gyroscope: XYZNumberData;
  satellitesTracked: StringData;
  tiltAngle: StringData;
}

export type EnterCommand = {
  type: 'ENTER_COMMAND';
  command: string;
};
export type SubmitCommand = {
  type: 'SUBMIT_COMMAND';
  command: string;
};

export type TerminalEvent =
  | EnterCommand
  | SubmitCommand
  | { type: 'MINIMIZE' }
  | { type: 'MAXIMIZE' };

export interface Command {
  text: string;
  timestamp: Date;
  output: string;
}

export interface TerminalContext {
  commandHistory: Command[];
  currentCommand: string;
}

export type ActorContext<T> = {
  snapshot: Readable<SnapshotFrom<T>>;
  send: (event: EventFrom<T>) => void;
  actorRef: ActorRefFrom<T>;
};

export type TerminalActorContext = ActorContext<typeof terminalMachine>;
export type GCSActorContext = ActorContext<typeof gcsMachine>;
export type CSVActorContext = ActorContext<typeof csvProcessingMachine>;
