import { writable } from 'svelte/store';

export interface TiltAngleValue {
  value: number[];
  time: string[];
}

function createTileAngleStore() {
  const { subscribe, set, update } = writable<TiltAngleValue>({
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

const tiltAngleStore = createTileAngleStore();
export default tiltAngleStore;
