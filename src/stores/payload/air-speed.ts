import { writable } from 'svelte/store';

interface airSpeedValue {
  value: number[];
  time: string[];
}
export interface IAcceleration {
  value: airSpeedValue[];
  time: string[];
}

function createAirSpeedStore() {
  const { subscribe, set, update } = writable<IAcceleration>({
    value: [],
    time: []
  });

  return {
    subscribe,
    update: ({ time, value }: { time: string; value: airSpeedValue }) =>
      update(($data) => {
        $data.value = [...$data.value, value];
        $data.time = [...$data.time, time];
        return $data;
      }),
    reset: () => set({ value: [], time: [] })
  };
}

const airSpeedStore = createAirSpeedStore();
export default airSpeedStore;
