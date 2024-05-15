import type { TelemetryData } from '../@types/app.types';

function calculateAltitude(
  P: number, // atmospheric pressure at a certain altitude in Pascals
  Pb: number, // atmospheric pressure at sea level in Pascals
  g0: number, // acceleration due to gravity at the Earth's surface in m/s^2
  M: number, // molar mass of Earth's air in kg/mol
  Rstar: number, // specific gas constant for dry air in J/(kg·K)
  Tb: number, // temperature at sea level in kelvins
  Lb: number, // temperature lapse rate in Kelvin/meter
): number {
  const term1 = (Rstar * Tb) / (-g0 * M);
  const term2 = Math.log(P / Pb);
  return term1 * term2 + Lb; // Add Lb to account for the base altitude
}

// Example usage
const seaLevelPressure = 101325; // atmospheric pressure at sea level in Pascals
const gravityAcceleration = 9.80665; // acceleration due to gravity in m/s^2
const molarMassAir = 0.0289644; // molar mass of Earth's air in kg/mol
// const atmosphericPressure = 93947; // atmospheric pressure at a certain altitude in Pascals
const gasConstantDryAir = 8.3144598; // specific gas constant for dry air in J/(mol·K)
const seaLevelTemperature = 578.15; // temperature at sea level in kelvins
const temperatureLapseRate = 0.0065; // temperature lapse rate in Kelvin/meter

export const calculatedAltitude = (atmosphericPressure: number) =>
  calculateAltitude(
    atmosphericPressure,
    seaLevelPressure,
    gravityAcceleration,
    molarMassAir,
    gasConstantDryAir,
    seaLevelTemperature,
    temperatureLapseRate,
  );

type State = 'notStarted' | 'inProgress' | 'done' | 'error';
export function determineParentState(childStates: State[]): State {
  let parentState: State = 'notStarted';

  for (const state of childStates) {
    if (state === 'error') {
      parentState = 'error';
      break;
    } else if (state === 'inProgress') {
      parentState = 'inProgress';
    } else if (state === 'done') {
      parentState = 'done';
    }
  }

  return parentState;
}

export function escapeAngleBrackets(text: string) {
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function parseTelemetryData(dataString: string): TelemetryData {
  const dataParts = dataString.trim().split(', ');

  const telemetryData: TelemetryData = {
    TEAM_ID: dataParts[0],
    MISSION_TIME: dataParts[1],
    PACKET_COUNT: dataParts[2],
    MODE: dataParts[3],
    STATE: dataParts[4],
    ALTITUDE: dataParts[5],
    AIR_SPEED: dataParts[6],
    HS_DEPLOYED: dataParts[7],
    PC_DEPLOYED: dataParts[8],
    TEMPERATURE: dataParts[9],
    VOLTAGE: dataParts[10],
    PRESSURE: dataParts[11],
    GPS_TIME: dataParts[12],
    GPS_ALTITUDE: dataParts[13],
    GPS_LATITUDE: dataParts[14],
    GPS_LONGITUDE: dataParts[15],
    GPS_SATS: dataParts[16],
    TILT_X: dataParts[17],
    TILT_Y: dataParts[18],
    ROT_Z: dataParts[19],
    CMD_ECHO: dataParts[20],
  };

  if (dataParts.length > 21) {
    telemetryData.OPTIONAL_DATA = dataParts.slice(21);
  }

  return telemetryData;
}
