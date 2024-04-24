import { browser } from '$app/environment';
import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';

function createUiStore() {
  const initialTheme = browser
    ? (localStorage.getItem('theme') as Theme) ?? 'light'
    : 'light';

  const { subscribe, update } = writable<{
    navbarHeight: number;
    theme: Theme;
  }>({
    navbarHeight: 0,
    theme: initialTheme,
  });

  function setTheme(theme: Theme) {
    update((state) => ({ ...state, theme }));
    if (browser) {
      localStorage.setItem('theme', theme);
    }
  }

  function setNavbarHeight(height: number) {
    update((state) => ({ ...state, navbarHeight: height }));
  }

  return {
    subscribe,
    setTheme,
    setNavbarHeight,
  };
}

export const uiStore = createUiStore();
