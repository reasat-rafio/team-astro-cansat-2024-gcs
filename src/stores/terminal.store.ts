import type { TerminalActorContext } from '@/lib/@types/app.types';
import { writable } from 'svelte/store';

const createTerminalStore = () => {
  const { subscribe, update } = writable<TerminalActorContext>();

  const setStore = (ref: TerminalActorContext) => {
    update(($store) => {
      $store = ref;
      return $store;
    });
  };

  return {
    subscribe,
    setStore,
  };
};

const terminalStore = createTerminalStore();
export default terminalStore;
