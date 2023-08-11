import { writable } from 'svelte/store';

export interface IAcceleration {
  value: number[];
  time: string[];
}

function createAccelerationStore() {
  const { subscribe, set, update } = writable<IAcceleration>({
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

const accelerationStore = createAccelerationStore();
export default accelerationStore;
