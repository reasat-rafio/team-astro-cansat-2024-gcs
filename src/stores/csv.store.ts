import { derived, writable } from 'svelte/store';

type State = 'idle' | 'ready' | 'processing' | 'completed';

interface CsvStore {
  state: State;
  rawData: string[][];
  streams: string[];
  streamsObj?: { [key: string]: string }[];
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

  function setSteamObj(currentLine: string[], headerRow: string[]) {
    update(($store) => {
      const obj = headerRow.reduce(
        (acc: { [key: string]: string }, columnName, index) => {
          acc[columnName] = currentLine[index];
          return acc;
        },
        {},
      );

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
    return $csvStore.streamsObj[$csvStore.streamsObj.length - 1] as {
      [key: string]: string;
    };
  } else {
    return {};
  }
});
