import { writable } from 'svelte/store';

interface UIStore {
  navbarHeight: number;
  showNotification: boolean;
}

function createUiStore() {
  const { subscribe, update, set } = writable<UIStore>({
    navbarHeight: 0,
    showNotification: true,
  });

  function setNavbarHeight(height: number) {
    update((state) => ({ ...state, navbarHeight: height }));
  }

  return {
    set,
    update,
    subscribe,
    setNavbarHeight,
  };
}

export const uiStore = createUiStore();
