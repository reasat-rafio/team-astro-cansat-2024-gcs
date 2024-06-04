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
  let countNotStarted = 0;
  let countInProgress = 0;
  let countDone = 0;
  let countError = 0;

  for (const state of childStates) {
    if (state === 'inProgress') {
      countInProgress++;
    } else if (state === 'done') {
      countDone++;
    } else if (state === 'error') {
      countError++;
    } else if (state === 'notStarted') {
      countNotStarted++;
    }
  }

  if (countInProgress > 0) {
    return 'inProgress';
  } else if (
    countDone > 0 &&
    countDone + countNotStarted === childStates.length
  ) {
    return 'inProgress';
  } else if (countDone === childStates.length) {
    return 'done';
  } else if (countError === childStates.length) {
    return 'error';
  } else if (countNotStarted === childStates.length) {
    return 'notStarted';
  } else {
    // Default state if none of the specific conditions are met
    return 'notStarted';
  }
}

export function escapeAngleBrackets(text: string) {
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function expandDecimal(num: number, decimals: number): string {
  // Convert number to string
  const numStr: string = num.toString();

  // Split integer and decimal parts
  const parts: string[] = numStr.split('.');

  // Generate random decimal numbers
  let randomDecimals: string = '';
  for (let i: number = 0; i < decimals; i++) {
    randomDecimals += Math.floor(Math.random() * 10).toString(); // Generates random number from 0 to 9
  }

  // Concatenate integer part, decimal point, and random decimals
  const expandedNum: string = parts[0] + '.' + randomDecimals;

  return expandedNum;
}