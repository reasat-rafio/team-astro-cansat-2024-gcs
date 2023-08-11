import { writable } from 'svelte/store';

export interface IPressure {
  value: number[];
  time: string[];
}

function createPressureStore() {
  const { subscribe, set, update } = writable<IPressure>({
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

const pressureStore = createPressureStore();
export default pressureStore;
