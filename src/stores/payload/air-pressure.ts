import { writable } from 'svelte/store';

interface AirPressureValue {
  value: number[];
  time: string[];
}
export interface IAcceleration {
  value: AirPressureValue[];
  time: string[];
}

function createAirPressureStore() {
  const { subscribe, set, update } = writable<IAcceleration>({
    value: [],
    time: []
  });

  return {
    subscribe,
    update: ({ time, value }: { time: string; value: AirPressureValue }) =>
      update(($data) => {
        $data.value = [...$data.value, value];
        $data.time = [...$data.time, time];
        return $data;
      }),
    reset: () => set({ value: [], time: [] })
  };
}

const airPressureStore = createAirPressureStore();
export default airPressureStore;
