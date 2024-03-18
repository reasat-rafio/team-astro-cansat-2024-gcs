import type { CSV_HEAD } from '@/lib/@types/app.types';
import { derived, writable } from 'svelte/store';
import {
  airPressureStore,
  airSpeedStore,
  altitudeStore,
  batteryVoltageStore,
  gpsCoordinatesStore,
  temperatureStore,
  tiltAngleStore,
} from './sensor.data.store';

type State = 'idle' | 'ready' | 'processing' | 'completed';
type StreamsObj = { [key in CSV_HEAD]: string };

interface CsvStore {
  state: State;
  rawData: string[][];
  streams: string[];
  streamsObj?: StreamsObj[];
}

function createCsvStore() {
  const { subscribe, update } = writable<CsvStore>({
    state: 'idle',
    rawData: [],
    streams: [],
    streamsObj: [],
  });

  function setState(state: State) {
    update(($store) => ({ ...$store, state }));
  }

  function setCsvFileRawData(csvData: string[][]) {
    update(($store) => ({ ...$store, rawData: csvData }));
  }

  function updateCsvStreams(stream: string) {
    update(($store) => ({
      ...$store,
      streams: [...($store.streams ?? []), stream],
    }));
  }

  function setSteamObj(currentLine: string[], headerRow: CSV_HEAD[]) {
    update(($store) => {
      const obj = headerRow.reduce(
        (acc: StreamsObj, columnName: CSV_HEAD, index: number) => {
          acc[columnName] = currentLine[index];
          return acc;
        },
        {} as StreamsObj,
      );

      altitudeStore.updateAltitude({
        time: obj.GPS_TIME,
        value: obj.ATMOSPHERIC_PRESSURE,
      });
      airPressureStore.updateAirPressure({
        time: obj.GPS_TIME,
        value: obj.PRESSURE,
      });

      temperatureStore.updateTemperature({
        time: obj.GPS_TIME,
        value: obj.TEMPERATURE,
      });

      airSpeedStore.updateAirSpeed({
        time: obj.GPS_TIME,
        value: obj.AIR_SPEED,
      });

      batteryVoltageStore.updateBatteryVoltage({
        time: obj.GPS_TIME,
        value: obj.VOLTAGE,
      });

      tiltAngleStore.updateTiltAngle({
        time: obj.GPS_TIME,
        value: { x: obj.TILT_X, y: obj.TILT_Y, z: obj.ROT_Z },
      });

      gpsCoordinatesStore.updateGpsCoordinates({
        time: obj.GPS_TIME,
        value: {
          x: obj.GPS_LATITUDE,
          y: obj.GPS_LONGITUDE,
          z: obj.GPS_ALTITUDE,
        },
      });

      return {
        ...$store,
        streamsObj: [...($store?.streamsObj ?? []), obj],
      };
    });
  }

  return {
    subscribe,
    setState,
    setSteamObj,
    setCsvFileRawData,
    updateCsvStreams,
  };
}

const csvStore = createCsvStore();
export default csvStore;

export const activeStreamObj = derived(csvStore, ($csvStore) => {
  if ($csvStore?.streamsObj) {
    const lastValue = $csvStore.streamsObj[$csvStore.streamsObj.length - 1];

    return lastValue;
  }
});
