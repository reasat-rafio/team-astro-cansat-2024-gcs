import { writable } from 'svelte/store';

interface AirSpeedValue {
  value: number[];
  time: string[];
}

function createAirSpeedStore() {
  const { subscribe, set, update } = writable<AirSpeedValue>({
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

const airSpeedStore = createAirSpeedStore();
export default airSpeedStore;
