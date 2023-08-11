import { writable } from 'svelte/store';

export interface IHumidity {
  value: number[];
  time: string[];
}

function createHumidityStore() {
  const { subscribe, set, update } = writable<IHumidity>({
    value: [],
    time: []
  });

  return {
    subscribe,
    update: ({ time, value }: { time: string; value: number }) =>
      update(($data) => {
        $data.value = [...$data.value, value];
        $data.time = [...$data.time, time];
        return $data;
      }),
    reset: () => set({ value: [], time: [] })
  };
}

const humidityStore = createHumidityStore();
export default humidityStore;
