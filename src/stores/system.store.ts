import { writable } from 'svelte/store';

interface SystemStore {
  activeMode: string;
  teamId: string;
}

function createSystemStore() {
  const { subscribe } = writable<SystemStore>({
    activeMode: 'idle',
    teamId: '',
  });

  return {
    subscribe,
  };
}

const systemStore = createSystemStore();
export default systemStore;
