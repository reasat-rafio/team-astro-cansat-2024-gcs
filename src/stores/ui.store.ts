import { writable } from 'svelte/store';

interface UIStore {
  navbarHeight: number;
  showNotification: boolean;
  lockLog: boolean;
  clockState: 'paused' | 'start' | 'reset';
  terminalInputEl: HTMLSpanElement | null;
}

function createUiStore() {
  const { subscribe, update, set } = writable<UIStore>({
    navbarHeight: 0,
    showNotification: true,
    lockLog: true,
    clockState: 'paused',
    terminalInputEl: null,
  });

  function setNavbarHeight(height: number) {
    update((state) => ({ ...state, navbarHeight: height }));
  }

  function setLockLog(lock: boolean) {
    update((state) => ({ ...state, lockLog: lock }));
  }

  function setTerminalInputEl(el: HTMLSpanElement) {
    update((state) => ({ ...state, terminalInputEl: el }));
  }

  function setClockState(clockState: 'paused' | 'start' | 'reset') {
    update((state) => ({ ...state, clockState }));
  }

  return {
    set,
    update,
    subscribe,
    setLockLog,
    setTerminalInputEl,
    setNavbarHeight,
    setClockState,
  };
}

export const uiStore = createUiStore();
