import { browser } from '$app/environment';
import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';

interface UIStore {
  navbarHeight: number;
  theme: Theme;
  showNotification: boolean;
}

const initialTheme = browser
  ? (localStorage.getItem('theme') as Theme) ?? 'light'
  : 'light';

function createUiStore() {
  const { subscribe, update, set } = writable<UIStore>({
    navbarHeight: 0,
    theme: initialTheme,
    showNotification: true,
  });

  function setTheme(theme: Theme) {
    localStorage.setItem('theme', theme);
    update((state) => ({ ...state, theme }));
  }

  function setNavbarHeight(height: number) {
    update((state) => ({ ...state, navbarHeight: height }));
  }

  return {
    set,
    update,
    subscribe,
    setTheme,
    setNavbarHeight,
  };
}

export const uiStore = createUiStore();
