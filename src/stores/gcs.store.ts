import type { GCSActorContext } from '@/lib/@types/app.types';
import { writable } from 'svelte/store';

const createGcsStore = () => {
  const { subscribe, update } = writable<GCSActorContext>();

  const setStore = (ref: GCSActorContext) => {
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

const gcsStore = createGcsStore();
export default gcsStore;
