import type { TerminalCommand, TerminalType } from '@/lib/@types/app.types';
import mqttHandler from '@/lib/mqtt';
import { addLog } from '@/stores/log.store';
// import commandHistoryStore from '@/stores/command.history.store'; // lastCommand,
import getSuccessOutput from '@/stores/terminal/helpers/get-current-success-output';
import updateCommandHistory from '@/stores/terminal/helpers/update-command-history';
import { uiStore } from '@/stores/ui.store';

interface Type {
  $state: TerminalType;
  command: TerminalCommand;
}

export default function CMD_2043_CX_OFF({ $state, command }: Type) {
  const successMessage = getSuccessOutput(command.value);
  mqttHandler.client.publish('ground_station/commands', 'CX/OFF');
  uiStore.setClockState('paused');

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
