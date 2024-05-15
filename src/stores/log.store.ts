import { toast } from 'svelte-sonner';
import { writable } from 'svelte/store';

interface Log {
  value: string;
  time: Date;
}

const logStore = writable<Log[]>([]);

export function addLog(log: Log) {
  logStore.update((logs) => [...logs, log]);
}

export function clearLogs() {
  logStore.set([]);
  toast.success('Logs cleared');
}

export default logStore;
