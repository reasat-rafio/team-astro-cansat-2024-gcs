import { writable } from 'svelte/store';

interface CsvStore {
  state: 'idle' | 'running' | 'completed';
  rawData: string[][];
  streams: string[];
  activeStreamObj?: { [key: string]: string };
}

function createCsvStore() {
  const { subscribe, update } = writable<CsvStore>({
    state: 'idle',
    rawData: [],
    streams: [],
    activeStreamObj: undefined,
  });

  function setState(state: 'idle' | 'running' | 'completed') {
    update(($store) => ({ ...$store, state }));
  }

  function setCsvFileRawData(csvData: string[][]) {
    update(($store) => ({ ...$store, rawData: csvData }));
  }

  function updateCsvStreams(stream: string) {
    update(($store) => ({
      ...$store,
      csvStreams: [...($store.streams ?? []), stream],
    }));
  }

  function setActiveStream({ key, value }: { key: string; value: string }) {
    update(($store) => ({ ...$store, activeStreamObj: { [key]: value } }));
  }

  return {
    subscribe,
    setState,
    setCsvFileRawData,
    updateCsvStreams,
    setActiveStream,
  };
}

const csvStore = createCsvStore();
export default csvStore;
