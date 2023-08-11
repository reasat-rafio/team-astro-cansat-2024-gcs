import { writable } from 'svelte/store';

interface AccelerationValue {
  x: number;
  y: number;
  z: number;
}

export interface IGyroscope {
  value: AccelerationValue[];
  time: string[];
}

function createGyroscopeStore() {
  const { subscribe, set, update } = writable<IGyroscope>({
    value: [],
    time: []
  });

  return {
    subscribe,
    update: ({ time, value }: { time: string; value: AccelerationValue }) =>
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
