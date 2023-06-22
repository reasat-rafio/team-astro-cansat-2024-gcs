import { writable } from 'svelte/store';

export interface IData {
  value: number[];
  time: string[];
}

export const temperature = writable<IData>({
  value: [],
  time: []
});

export const voltage = writable<IData>({
  value: [],
  time: []
});
