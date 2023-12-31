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
}

export type MachineEvent =
  | { type: 'ACTIVATE' }
  | UpdateAcceleration
  | UpdateAirPressure
  | UpdateAirSpeed
  | UpdateAltitude
  | UpdateTemperature
  | UpdateBatteryVoltage
  | UpdateGpsCoordinates
  | UpdateGyroscope
  | UpdateLongitude
  | UpdateSatellitesTracked
  | UpdateTiltAngle
  | { type: 'KILL' };

export type UpdateAcceleration = {
  type: 'UPDATE_ACCELERATION';
  acceleration: XYZNumberData;
};

export type UpdateAirPressure = {
  type: 'UPDATE_AIR_PRESSURE';
  airPressure: StringData;
};

export type UpdateAirSpeed = {
  type: 'UPDATE_AIR_SPEED';
  airSpeed: StringData;
};

export type UpdateAltitude = {
  type: 'UPDATE_ALTITUDE';
  altitude: StringData;
};

export type UpdateTemperature = {
  type: 'UPDATE_TEMPERATURE';
  temperature: StringData;
};

export type UpdateBatteryVoltage = {
  type: 'UPDATE_BATTERY_VOLTAGE';
  batteryVoltage: StringData;
};

export type UpdateGpsCoordinates = {
  type: 'UPDATE_GPS_COORDINATES';
  gpsCoordinates: StringData;
};

export type UpdateGyroscope = {
  type: 'UPDATE_GYROSCOPE';
  gyroscope: XYZNumberData;
};

export type UpdateLongitude = {
  type: 'UPDATE_LONGITUDE';
  longitude: StringData;
};

export type UpdateSatellitesTracked = {
  type: 'UPDATE_SATELLITES_TRACKED';
  satellitesTracked: StringData;
};

export type UpdateTiltAngle = {
  type: 'UPDATE_TILT_ANGLE';
  tiltAngle: StringData;
};

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
}

export interface TerminalContext {
  commandHistory: Command[];
  currentCommand: string;
  output: string;
}
