import { browser } from '$app/environment';
import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';

function createUiStore() {
  const initialTheme = browser
    ? (localStorage.getItem('theme') as Theme) ?? 'light'
    : 'light';

  const { subscribe, update, set } = writable<{
    navbarHeight: number;
    theme: Theme;
  }>({
    navbarHeight: 0,
    theme: initialTheme,
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
