import { toast } from 'svelte-sonner';
import { writable } from 'svelte/store';

interface Log {
  value: string;
  time: Date;
}

const defaultValue: Log[] = [];
const initialValue = JSON.parse(
  window.localStorage.getItem('logs') ?? JSON.stringify(defaultValue),
);

const logStore = writable<Log[]>(initialValue);

export function addLog(log: Log) {
  logStore.update((logs) => [...logs, log]);
}

export function clearLogs() {
  logStore.set([]);
  toast.success('Logs cleared');
}

logStore.subscribe((value) => {
  window.localStorage.setItem('logs', JSON.stringify(value));
});

export default logStore;
