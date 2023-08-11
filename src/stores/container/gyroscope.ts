import { writable } from 'svelte/store';

export interface IGyroscope {
  value: number[];
  time: string[];
}

function createGyroscopeStore() {
  const { subscribe, set, update } = writable<IGyroscope>({
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

const gyroscopeStore = createGyroscopeStore();
export default gyroscopeStore;
