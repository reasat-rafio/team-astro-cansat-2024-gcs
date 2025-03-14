import type { TerminalCommand, TerminalType } from '@/lib/@types/app.types';
import mqttHandler from '@/lib/mqtt';
import commandHistoryStore from '@/stores/command.history.store';
import { addLog } from '@/stores/log.store';
import getSuccessOutput from '@/stores/terminal/helpers/get-current-success-output';
import updateCommandHistory from '@/stores/terminal/helpers/update-command-history';

interface Type {
  $state: TerminalType;
  command: TerminalCommand;
}

export default function CMD_2043_BCN_ON({ $state, command }: Type) {
  mqttHandler.client.publish('ground_station/commands', 'BCN/ON');

  commandHistoryStore.setCommandHistory({
    ...command,
    output: `<p>${command.value} executed successfully. Waiting for response..</p>`,
    status: 'pending',
  });

  addLog({
    value: `${command.value} executed successfully. Waiting for response..`,
    time: new Date(),
    state: 'success',
  });

  return {
    ...$state,
    currentCommand: command,
    currentCommandIdx: 0,
  };
}
