import commandHistoryStore, {
  lastCommand,
} from '@/stores/command.history.store';
import { getCurrentSuccessOutput } from '@/stores/terminal.store';
import { get } from 'svelte/store';

export default function CMD_2043_CX_ON() {
  if (get(lastCommand).status === 'pending') {
    setTimeout(() => {
      commandHistoryStore.setLatestCommandOutput(getCurrentSuccessOutput());
      commandHistoryStore.updateLastCommandStatus('success');
    }, 500);
  }
  return {
    error: null,
  };
}
