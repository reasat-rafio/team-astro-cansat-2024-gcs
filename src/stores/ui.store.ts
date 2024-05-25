import { writable } from 'svelte/store';

interface UIStore {
  navbarHeight: number;
  showNotification: boolean;
  lockLog: boolean;
  startClock: boolean;
  terminalInputEl: HTMLSpanElement | null;
}

function createUiStore() {
  const { subscribe, update, set } = writable<UIStore>({
    navbarHeight: 0,
    showNotification: true,
    lockLog: true,
    startClock: false,
    terminalInputEl: null,
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

  function setTerminalInputEl(el: HTMLSpanElement) {
    update((state) => ({ ...state, terminalInputEl: el }));
  }

  return {
    set,
    update,
    subscribe,
    setLockLog,
    setStartClock,
    setTerminalInputEl,
    setNavbarHeight,
  };
}

export const uiStore = createUiStore();
