import { writable } from 'svelte/store';

interface OutPutStore {
  activeMode: string;
  teamId: string;
}

function createOutputStore() {
  const { subscribe } = writable<OutPutStore>({
    activeMode: 'idle',
    teamId: '2043',
  });

  return {
    subscribe,
  };
}

const outputStore = createOutputStore();
export default outputStore;
