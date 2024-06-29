import { get } from 'svelte/store';
import validTerminalCommandStoreStore from '../valid-terminal-command.sore';

export default function getSuccessOutput(currentCmd: string) {
  return get(validTerminalCommandStoreStore).find(
    ({ cmd }) => cmd === currentCmd,
  )?.successMessage;
}
