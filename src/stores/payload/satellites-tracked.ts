import { writable } from 'svelte/store';

interface SatellitesTrackedValue {
  value: number[];
  time: string[];
}

function createSatellitesTrackedStore() {
  const { subscribe, set, update } = writable<SatellitesTrackedValue>({
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

const satellitesTrackedStore = createSatellitesTrackedStore();
export default satellitesTrackedStore;
