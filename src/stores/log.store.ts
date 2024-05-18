import { toast } from 'svelte-sonner';
import { writable } from 'svelte/store';

interface Log {
  value: string;
  time: Date;
  state?: 'info' | 'success' | 'error';
}

const logStore = writable<Log[]>([]);

export function addLog(log: Log) {
  log.state = log.state ?? 'info';
  logStore.update((logs) => [...logs, log]);
}

export function clearLogs() {
  logStore.set([]);
  toast.success('Logs cleared');
}

export default logStore;
