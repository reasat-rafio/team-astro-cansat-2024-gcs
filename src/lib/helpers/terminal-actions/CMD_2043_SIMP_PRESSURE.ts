import type { TerminalCommand, TerminalType } from '@/lib/@types/app.types';
import updateCommandHistory from '@/stores/terminal/helpers/update-command-history';

interface Type {
  $state: TerminalType;
  command: TerminalCommand;
}

export default function CMD_2043_SIMP_PRESSURE({ $state, command }: Type) {
  try {
    const pressureVal = command.value.split(',')[3];

    return updateCommandHistory({
      $state,
      command,
      status: 'success',
      output: `<p class="text-green-600">${command.value} executed successfully. Pressure data has been set to ${pressureVal} </p>`,
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
