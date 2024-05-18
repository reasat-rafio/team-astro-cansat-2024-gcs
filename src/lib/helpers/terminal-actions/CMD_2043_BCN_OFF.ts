import type { TerminalCommand, TerminalType } from '@/lib/@types/app.types';
import { addLog } from '@/stores/log.store';
import getSuccessOutput from '@/stores/terminal/helpers/get-current-success-output';
import updateCommandHistory from '@/stores/terminal/helpers/update-command-history';

interface Type {
  $state: TerminalType;
  command: TerminalCommand;
}

export default function CMD_2043_BCN_OFF({ $state, command }: Type) {
  try {
    const successMessage = getSuccessOutput(command.value);

    addLog({
      value: `${command.value} executed successfully. ${successMessage}.`,
      time: command.time,
      state: 'success',
    });

    return updateCommandHistory({
      $state,
      command,
      status: 'success',
      output: `<p class="text-green-600">${command.value} executed successfully. ${successMessage}.</p>`,
    });
  } catch (error) {
    addLog({ value: `Error: ${error}`, time: command.time, state: 'error' });

    return updateCommandHistory({
      command,
      $state,
      status: 'error',
      output: `<p class="text-destructive">Error: ${error}</p>`,
    });
  }
}
