import type csvProcessingMachine from '@/machines/csv-machine';
import type gcsMachine from '@/machines/gcs-machine';
import type terminalMachine from '@/machines/terminal-machine';
import type { Readable } from 'svelte/store';
import type { ActorRefFrom, EventFrom, SnapshotFrom } from 'xstate';

interface StringArrayData {
  values: string[];
  time: string[];
}

interface XYZStringArrayData {
  values: { x: string; y: string; z: string }[];
  time: string[];
}

export interface StringData {
  value: string;
  time: string;
}

export interface XYZStringData {
  value: { x: string; y: string; z: string };
  time: string;
}
export interface XYStringArrayData {
  values: { x: string; y: string }[];
  time: string[];
}

export interface XYStringData {
  value: { x: string; y: string };
  time: string;
}

export interface MachineContext {
  state: string;
  mode: string;
  output: string;
  teamId: string;
  sensorData: {
    acceleration: XYZStringArrayData;
    airPressure: StringArrayData;
    airSpeed: StringArrayData;
    altitude: StringArrayData;
    temperature: StringArrayData;
    batteryVoltage: StringArrayData;
    gpsCoordinates: XYZStringArrayData;
    gpsTime: string[];
    missionTime: string[];
    gyroscope: XYZStringArrayData;
    longitude: StringArrayData;
    satellitesTracked: StringArrayData;
    tiltAngle: XYZStringArrayData;
    packetCount: string;
    pcDeployed: boolean;
    hSDeployed: boolean;
  };
}

export type UpdateAltitude = {
  type: 'UPDATE_ALTITUDE';
  data: StringData;
};
export type UpdateTemperature = {
  type: 'UPDATE_TEMPERATURE';
  data: StringData;
};

export type UpdatePcDeployed = {
  type: 'UPDATE_PC_DEPLOYED';
  data: boolean;
};

export type UpdateHsDeployed = {
  type: 'UPDATE_HS_DEPLOYED';
  data: boolean;
};

export type UpdateAirPressure = {
  type: 'UPDATE_AIR_PRESSURE';
  data: StringData;
};
export type UpdateAirSpeed = {
  type: 'UPDATE_AIR_SPEED';
  data: StringData;
};

export type UpdateBatteryVoltage = {
  type: 'UPDATE_BATTERY_VOLTAGE';
  data: StringData;
};

export type UpdateGPSCoordinates = {
  type: 'UPDATE_GPS_COORDINATES';
  data: XYZStringData;
};

export type UpdateTiltAngle = {
  type: 'UPDATE_TILT_ANGLE';
  data: XYZStringData;
};
export type UpdateState = {
  type: 'UPDATE_STATE';
  data: string;
};
export type UpdatePacketCount = {
  type: 'UPDATE_PACKET_COUNT';
  data: string;
};
export type UpdateMode = {
  type: 'UPDATE_MODE';
  data: string;
};

export type UpdateGpsTime = {
  type: 'UPDATE_GPS_TIME';
  data: string;
};

export type UpdateMissionTime = {
  type: 'UPDATE_MISSION_TIME';
  data: string;
};
export type SetTeamId = {
  type: 'SET_TEAM_ID';
  data: string;
};

export type MachineEvent =
  | { type: 'ENABLE_SIMULATION' }
  | { type: 'ENABLE_FLIGHT' }
  | { type: 'ACTIVATE_SIMULATION' }
  | UpdateAltitude
  | UpdateTemperature
  | UpdateAirPressure
  | UpdateAirSpeed
  | UpdateBatteryVoltage
  | UpdateGPSCoordinates
  | UpdateTiltAngle
  | UpdateState
  | UpdatePacketCount
  | UpdateMode
  | UpdatePcDeployed
  | UpdateHsDeployed
  | UpdateGpsTime
  | UpdateMissionTime
  | SetTeamId
  | { type: 'TRIGGER_ASCENDING' }
  | { type: 'START_SIMULATION' }
  | { type: 'UPDATE_ALTITUDE' }
  | { type: 'ACTIVATE_FLIGHT' }
  | { type: 'TRIGGER_DESCENDING' }
  | { type: 'TRIGGER_LANDING' }
  | { type: 'UPDATE_DATA'; data: MachineData }
  | { type: 'KILL' };

interface MachineData {
  acceleration?: XYZStringData;
  airPressure: StringData;
  airSpeed: StringData;
  altitude: StringData;
  temperature: StringData;
  batteryVoltage: StringData;
  gpsCoordinates: StringData;
  longitude: StringData;
  gyroscope: XYZStringData;
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

export interface MissionData {
  TEAM_ID: string;
  MISSION_TIME: string;
  PACKET_COUNT: string;
  MODE: string;
  STATE: string;
  ALTITUDE: string;
  AIR_SPEED: string;
  HS_DEPLOYED: string;
  PC_DEPLOYED: string;
  TEMPERATURE: string;
  VOLTAGE: string;
  PRESSURE: string;
  GPS_TIME: string;
  GPS_ALTITUDE: string;
  GPS_LATITUDE: string;
  GPS_LONGITUDE: string;
  GPS_SATS: string;
  TILT_X: string;
  TILT_Y: string;
  ROT_Z: string;
  CMD_ECHO: string;
}
