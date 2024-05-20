import { writable } from 'svelte/store';

interface UIStore {
  navbarHeight: number;
  showNotification: boolean;
  lockLog: boolean;
  startClock: boolean;
}

function createUiStore() {
  const { subscribe, update, set } = writable<UIStore>({
    navbarHeight: 0,
    showNotification: true,
    lockLog: true,
    startClock: false,
  });

  function setNavbarHeight(height: number) {
    update((state) => ({ ...state, navbarHeight: height }));
  }

  function setLockLog(lock: boolean) {
    update((state) => ({ ...state, lockLog: lock }));
  }

  function setStartClock(start: boolean) {
    update((state) => ({ ...state, startClock: start }));
  }

  return {
    set,
    update,
    subscribe,
    setLockLog,
    setStartClock,
    setNavbarHeight,
  };
}

export const uiStore = createUiStore();
