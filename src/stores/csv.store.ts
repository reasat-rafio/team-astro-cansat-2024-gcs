import type { CSVActorContext } from '@/lib/@types/app.types';
import { writable } from 'svelte/store';

const createCsvStore = () => {
  const { subscribe, update } = writable<CSVActorContext>();

  const setStore = (ref: CSVActorContext) => {
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

const csvStore = createCsvStore();
export default csvStore;
