import type { TerminalCommand, TerminalType } from '@/lib/@types/app.types';
import getSuccessOutput from '@/stores/terminal/helpers/get-current-success-output';
import updateCommandHistory from '@/stores/terminal/helpers/update-command-history';

interface Type {
  $state: TerminalType;
  command: TerminalCommand;
}

export default function CMD_2043_SIMP_PRESSURE({ $state, command }: Type) {
  try {
    const successMessage = getSuccessOutput(command.value);
    const pressureVal = command.value.split(',')[3];

    console.log('====================================');
    console.log(pressureVal);
    console.log('====================================');

    return updateCommandHistory({
      $state,
      command,
      status: 'success',
      output: `<p class="text-green-600">${command.value} executed successfully. ${successMessage}.</p>`,
    });
  } catch (error) {
    return updateCommandHistory({
      command,
      $state,
      status: 'error',
      output: `<p class="text-destructive">Error: ${error}</p>`,
    });
  }
}
