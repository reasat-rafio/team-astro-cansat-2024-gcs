import { writable } from 'svelte/store';

export const navbarHeight = writable(0);
export const theme = writable<'light' | 'dark'>('light');
