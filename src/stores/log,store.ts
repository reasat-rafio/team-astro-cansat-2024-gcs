import { writable } from 'svelte/store';

interface Log {
  value: string;
  time: string;
}

function createLogStore() {
  const { subscribe, update, set } = writable<Log[]>();

  function addLog(log: Log) {
    update(($store) => [...$store, log]);
  }

  function clearLog() {
    update(() => []);
  }

  return {
    set,
    update,
    addLog,
    subscribe,
    clearLog,
  };
}

const logStore = createLogStore();
export default logStore;
