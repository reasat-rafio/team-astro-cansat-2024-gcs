import type { TelemetryData } from '../@types/app.types';

export function isValidTelemetryData(dataParts: string[]): boolean {
  if (dataParts.length < 20) return false;

  const TEAM_ID = dataParts[0] === '2043';
  const MISSION_TIME = !isNaN(parseInt(dataParts[1]));
  const PACKET_COUNT = !isNaN(parseInt(dataParts[2]));
  const MODE = /^[A-Z]$/.test(dataParts[3]);
  const STATE = /^[A-Z_]+$/.test(dataParts[4]);
  const ALTITUDE = !isNaN(parseFloat(dataParts[5]));
  const AIR_SPEED = !isNaN(parseFloat(dataParts[6]));
  const HS_DEPLOYED = /^[A-Z]$/.test(dataParts[7]);
  const PC_DEPLOYED = /^[A-Z]$/.test(dataParts[8]);
  const TEMPERATURE = !isNaN(parseInt(dataParts[9]));
  const VOLTAGE = !isNaN(parseFloat(dataParts[10]));
  const PRESSURE = !isNaN(parseFloat(dataParts[11]));
  const GPS_TIME = typeof dataParts[12] === 'string';
  const GPS_ALTITUDE = typeof dataParts[13] === 'string';
  const GPS_LATITUDE = typeof dataParts[14] === 'string';
  const GPS_LONGITUDE = typeof dataParts[15] === 'string';
  const GPS_SATS = typeof dataParts[16] === 'string';
  const TILT_X = !isNaN(parseInt(dataParts[17]));
  const TILT_Y = !isNaN(parseInt(dataParts[18]));
  const ROT_Z = !isNaN(parseInt(dataParts[19]));

  return (
    TEAM_ID &&
    MISSION_TIME &&
    PACKET_COUNT &&
    MODE &&
    STATE &&
    ALTITUDE &&
    AIR_SPEED &&
    HS_DEPLOYED &&
    PC_DEPLOYED &&
    TEMPERATURE &&
    VOLTAGE &&
    PRESSURE &&
    GPS_TIME &&
    GPS_ALTITUDE &&
    GPS_LATITUDE &&
    GPS_LONGITUDE &&
    GPS_SATS &&
    TILT_X &&
    TILT_Y &&
    ROT_Z
  );
}

export function parseTelemetryData(dataString: string): TelemetryData | null {
  const dataParts = dataString.trim().split(', ');

  if (!isValidTelemetryData(dataParts)) return null;

  const telemetryData: TelemetryData = {
    TEAM_ID: dataParts[0],
    MISSION_TIME: parseInt(dataParts[1]),
    PACKET_COUNT: parseInt(dataParts[2]),
    MODE: dataParts[3],
    STATE: dataParts[4],
    ALTITUDE: parseFloat(dataParts[5]),
    AIR_SPEED: parseFloat(dataParts[6]),
    HS_DEPLOYED: dataParts[7],
    PC_DEPLOYED: dataParts[8],
    TEMPERATURE: parseFloat(dataParts[9]),
    VOLTAGE: parseFloat(dataParts[10]),
    PRESSURE: parseFloat(dataParts[11]),
    GPS_TIME: dataParts[12],
    GPS_ALTITUDE: dataParts[13],
    GPS_LATITUDE: dataParts[14],
    GPS_LONGITUDE: dataParts[15],
    GPS_SATS: dataParts[16],
    TILT_X: parseInt(dataParts[17]),
    TILT_Y: parseInt(dataParts[18]),
    ROT_Z: parseInt(dataParts[19]),
    CMD_ECHO: dataParts[20],
  };

  if (dataParts.length > 21) {
    telemetryData.OPTIONAL_DATA = dataParts.slice(21);
  }

  return telemetryData;
}

export function processTelemetryData(dataString: string) {
  const telemetryData = parseTelemetryData(dataString);

  return telemetryData
    ? { isValid: true, data: telemetryData }
    : { isValid: false, data: dataString };
}

function isValidResponseData(dataParts: string[]): boolean {
  if (dataParts.length !== 3) return false;

  const CMD = /^[A-Z_\/]+$/.test(dataParts[0]);
  const STATUS = /^[A-Z_]+$/.test(dataParts[1]);
  const MESSAGE = typeof dataParts[2] === 'string';

  return CMD && STATUS && MESSAGE;
}
function parseResponseData(dataString: string) {
  const dataParts = dataString.trim().split(', ');

  if (!isValidResponseData(dataParts)) return null;

  const response = {
    command: dataParts[0],
    status: dataParts[1],
    message: dataParts[2],
  };

  return response;
}

export function processResponseData(dataString: string) {
  const responseData = parseResponseData(dataString);

  return responseData
    ? { isValid: true, data: responseData }
    : { isValid: false, data: dataString };
}
