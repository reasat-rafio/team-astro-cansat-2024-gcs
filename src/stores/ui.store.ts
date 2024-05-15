import { writable } from 'svelte/store';

interface UIStore {
  navbarHeight: number;
  showNotification: boolean;
  lockLog: boolean;
}

function createUiStore() {
  const { subscribe, update, set } = writable<UIStore>({
    navbarHeight: 0,
    showNotification: true,
    lockLog: true,
  });

  function setNavbarHeight(height: number) {
    update((state) => ({ ...state, navbarHeight: height }));
  }

  function setLockLog(lock: boolean) {
    update((state) => ({ ...state, lockLog: lock }));
  }

  return {
    set,
    update,
    subscribe,
    setLockLog,
    setNavbarHeight,
  };
}

export const uiStore = createUiStore();
