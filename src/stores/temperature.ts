import { writable } from 'svelte/store';

export interface ITemperature {
  value: number[];
  time: string[];
}

function createTemperatureStore() {
  const { subscribe, set, update } = writable<ITemperature>({
    value: [],
    time: []
  });

  return {
    subscribe,
    add: ({ time, value }: { time: string; value: number }) =>
      update(($data) => {
        $data.value = [...$data.value, value];
        $data.time = [...$data.time, time];
        return $data;
      }),
    reset: () => set({ value: [], time: [] })
  };
}

export const temperatureStore = createTemperatureStore();
