import { writable } from 'svelte/store';

function createRowTelemetryStore() {
  const { subscribe, update, set } = writable<string[]>([]);

  function updateTelemetry(data: string) {
    update((store) => {
      return [...store, data];
    });
  }

  return {
    set,
    update,
    subscribe,
    updateTelemetry,
  };
}

const rowTelemetryStore = createRowTelemetryStore();
export default rowTelemetryStore;
