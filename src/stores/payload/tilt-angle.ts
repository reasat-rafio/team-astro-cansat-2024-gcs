import { writable } from 'svelte/store';

interface tiltAngleValue {
  value: number[];
  time: string[];
}
export interface IAcceleration {
  value: tiltAngleValue[];
  time: string[];
}

function createTileAngleStore() {
  const { subscribe, set, update } = writable<IAcceleration>({
    value: [],
    time: []
  });

  return {
    subscribe,
    update: ({ time, value }: { time: string; value: tiltAngleValue }) =>
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
