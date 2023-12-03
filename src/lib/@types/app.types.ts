export interface StringArrayData {
  values: string[];
  timestamps: string[];
}

export interface XYZNumberData {
  values: { x: number; y: number; z: number }[];
  timestamps: string[];
}

export interface MachineContext {
  acceleration: XYZNumberData;
  airPressure: StringArrayData;
  airSpeed: StringArrayData;
  altitude: StringArrayData;
  temperature: StringArrayData;
  batteryVoltage: StringArrayData;
  gpsCoordinates: StringArrayData;
  gyroscope: XYZNumberData;
  longitude: StringArrayData;
  satellitesTracked: StringArrayData;
  tiltAngle: StringArrayData;
}

export type MachineEvent =
  | { type: 'ACTIVATE' }
  | {
      type: 'UPDATE_DATA';
      value: string;
    }
  | { type: 'KILL' }
  | {
      type: 'updateAcceleration';
    };
