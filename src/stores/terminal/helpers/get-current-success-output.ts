import { validCommands } from '@/lib/helper';
import { get } from 'svelte/store';
import terminalStore from '../terminal.store';

export default function getCurrentSuccessOutput() {
  return (
    validCommands[
      get(terminalStore).currentCommand?.value as keyof typeof validCommands
    ]?.successMessage ?? ''
  );
}
