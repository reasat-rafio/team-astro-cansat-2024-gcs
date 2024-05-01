import commandHistoryStore, {
  lastCommand,
} from '@/stores/command.history.store';
import getSuccessOutput from '@/stores/terminal/helpers/get-current-success-output';
import { get } from 'svelte/store';

export default function CAL() {
  if (get(lastCommand).status === 'pending') {
    setTimeout(() => {
      commandHistoryStore.setLatestCommandOutput(getSuccessOutput());
      commandHistoryStore.updateLastCommandStatus('success');
    }, 500);
  }
  return {
    error: null,
  };
}
