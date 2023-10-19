import { writable } from 'svelte/store';

interface BatteryVoltageValue {
  value: number[];
  time: string[];
}

function createBatteryVoltageStore() {
  const { subscribe, set, update } = writable<BatteryVoltageValue>({
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

const batteryVoltageStore = createBatteryVoltageStore();
export default batteryVoltageStore;
