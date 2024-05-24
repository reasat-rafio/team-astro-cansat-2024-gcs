import type { TerminalCommand, TerminalType } from '@/lib/@types/app.types';
import mqttHandler from '@/lib/mqtt';
import { addLog } from '@/stores/log.store';
import getSuccessOutput from '@/stores/terminal/helpers/get-current-success-output';
import updateCommandHistory from '@/stores/terminal/helpers/update-command-history';

interface Type {
  $state: TerminalType;
  command: TerminalCommand;
}

export default function CMD_2043_BCN_ON({ $state, command }: Type) {
  const successMessage = getSuccessOutput(command.value);
  mqttHandler.client.publish('ground_station/commands', 'BCN/ON');

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
}
