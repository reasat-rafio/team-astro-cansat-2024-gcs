import type { TerminalCommand, TerminalType } from '@/lib/@types/app.types';
import mqttHandler from '@/lib/mqtt';
import commandHistoryStore from '@/stores/command.history.store';
import { addLog } from '@/stores/log.store';

interface Type {
  $state: TerminalType;
  command: TerminalCommand;
}

export default function CMD_2043_SIM_DISABLE({ $state, command }: Type) {
  mqttHandler.client.publish('ground_station/commands', 'SIM/DISABLE');

  commandHistoryStore.setCommandHistory({
    ...command,
    output: `<p>${command.value} executed successfully. Waiting for response..</p>`,
    status: 'pending',
  });

  addLog({
    value: `${command.value} executed successfully. Waiting for response..`,
    time: command.time,
  });

  return {
    ...$state,
    currentCommand: command,
    currentCommandIdx: 0,
  };
}
