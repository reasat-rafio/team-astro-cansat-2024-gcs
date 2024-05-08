export interface StringArrayData {
  values: string[];
  time: string[];
}

export interface XYZStringArrayData {
  values: { x: string; y: string; z: string }[];
  time: string[];
}

export interface StringData {
  value: string;
  time: Date;
}

export interface XYZStringData {
  value: { x: string; y: string; z: string };
  time: Date;
}
export interface XYStringArrayData {
  values: { x: string; y: string }[];
  time: string[];
}

export interface XYStringData {
  value: { x: string; y: string };
  time: string;
}

export type SystemStatus = 'notStarted' | 'inProgress' | 'done' | 'error';
export interface MachineContext {
  state: string;
  mode: string;
  output: string;
  teamId: string;
  steps: SystemSteps;
  sensorData: SensorData;
}

export interface SystemSteps {
  simulationMode: {
    gettingPressureDataFromCSV: SystemStatus;
    calculatingAltitudeAndSpeed: SystemStatus;
  };

  groundMode: {
    powerOnIdle: SystemStatus;
    debuggingSystemStarted: SystemStatus;
    communicationModuleOn: SystemStatus;
  };
  flightReadyMode: {
    activateSensorAndSystemCalibrationStart: SystemStatus;
    telemetryStarted: SystemStatus;
  };
  launchMode: {
    sensorCalibration: SystemStatus;
    setMissionTime: SystemStatus;
    launch: SystemStatus;
  };
  ascentMode: {
    ejectionDelay: SystemStatus;
  };

  cansatDeploymentMode: {
    tiltCorrection: SystemStatus;
    heatShieldDeployed: SystemStatus;
  };
  arrowBreakingDecentMode: {
    heatShieldReleasePreparation: SystemStatus;
    heatShieldReleased: SystemStatus;
  };

  landingMode: {
    parachuteDeployment: SystemStatus;
    bonusCameraStarted: SystemStatus;
    recoveryPreparation: SystemStatus;
    landed: SystemStatus;
  };

  recoveryMode: {
    recoveryMechanismRunning: SystemStatus;
    GPSLocationPinning: SystemStatus;
    audioBuzzerPinning: SystemStatus;
    deviceFound: SystemStatus;
    telemetryOff: SystemStatus;
  };

  importCSV: SystemStatus;
  telemetryStarted: SystemStatus;
  calibrateTelemetry: SystemStatus;
  currentTimeSetFromGPS: SystemStatus;
  simulationEnable: SystemStatus;
  simulationActivate: SystemStatus;
  flightEnable: SystemStatus;
}

export interface SensorData {
  acceleration: XYZStringArrayData;
  airPressure: StringArrayData;
  airSpeed: StringArrayData;
  altitude: StringData;
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
  hsDeployed: boolean;
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

export type ImportCsv = {
  type: 'IMPORT_CSV';
  status: SystemStatus;
};

export type MachineEvent =
  | { type: 'ENABLE_SIMULATION' }
  | ImportCsv
  | { type: 'ENABLE_FLIGHT' }
  | { type: 'ACTIVATE_SIMULATION' }
  | { type: 'CSV_PROCESSING_COMPLETE' }
  | { type: 'DISABLE_SIMULATION' }
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
  output?: string;
}

export interface TerminalContext {
  commandHistory: Command[];
  currentCommand: string;
}

export interface MissionData {
  TEAM_ID: string;
  MISSION_TIME: string;
  ATMOSPHERIC_PRESSURE: string;
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

export type CommandStatus = 'success' | 'error' | 'pending';
export interface TerminalCommand {
  id?: string;
  time: Date;
  value: string;
}
export interface UpdateCommandHistory {
  $state: TerminalType;
  command: TerminalCommand;
  output: string;
  status: CommandStatus;
}
export interface CommandHistory extends TerminalCommand {
  output: string;
  status: CommandStatus;
}

export interface TerminalType {
  terminalUiState: 'minimize' | 'maximize';
  currentCommand?: TerminalCommand;
  previousCommand?: TerminalCommand;
  currentCommandIdx: null | number;
}
export type CSV_HEAD =
  | 'TEAM_ID'
  | 'MISSION_TIME'
  | 'PACKET_COUNT'
  | 'MODE'
  | 'STATE'
  | 'ALTITUDE'
  | 'AIR_SPEED'
  | 'HS_DEPLOYED'
  | 'PC_DEPLOYED'
  | 'TEMPERATURE'
  | 'VOLTAGE'
  | 'PRESSURE'
  | 'GPS_TIME'
  | 'GPS_ALTITUDE'
  | 'GPS_LATITUDE'
  | 'GPS_LONGITUDE'
  | 'GPS_SATS'
  | 'TILT_X'
  | 'TILT_Y'
  | 'ROT_Z'
  | 'CMD_ECHO'
  | 'ATMOSPHERIC_PRESSURE';

export type MqttPayloadTopic =
  | 'telemetry/data'
  | 'altitude'
  | 'air_pressure'
  | 'temperature'
  | 'battery_voltage'
  | 'tilt_angle'
  | 'air_speed'
  | 'command_echo'
  | 'gps_coordinates'
  | 'longitude'
  | 'satellites_tracked'
  //
  | 'acceleration'
  | 'gyroscope'
  | 'pressure';

export type ValidCommand =
  | 'CMD,2043,CX,ON'
  | 'CMD,2043,CX,OFF'
  | 'CMD,2043,ST,<UTC_TIME>|GPS'
  | 'CAL'
  | 'CMD,2043,SIM,ENABLE'
  | 'CMD,2043,SIM,ACTIVATE'
  | 'CMD,2043,SIM,<~PRESSURE~>'
  | 'CMD,2043,SIM,DISABLE'
  | 'help'
  | 'clear';

export interface TelemetryData {
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
  OPTIONAL_DATA?: string[];
}
