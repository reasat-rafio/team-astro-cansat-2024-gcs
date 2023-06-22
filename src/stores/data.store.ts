import { writable } from 'svelte/store';

export interface ITemperature {
  temperature: number[];
  time: string[];
}

export const temperature = writable<ITemperature>({
  temperature: [],
  time: []
});
