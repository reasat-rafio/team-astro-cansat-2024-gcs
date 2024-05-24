import type { TerminalCommand, TerminalType } from '@/lib/@types/app.types';
import mqttHandler from '@/lib/mqtt';
import { addLog } from '@/stores/log.store';
import updateCommandHistory from '@/stores/terminal/helpers/update-command-history';

interface Type {
  $state: TerminalType;
  command: TerminalCommand;
}

export default function CMD_2043_SIMP_PRESSURE({ $state, command }: Type) {
  const pressureVal = command.value.split(',')[3];
  mqttHandler.client.publish(
    'ground_station/commands',
    `PRESSURE/${pressureVal}`,
  );

  addLog({
    value: `${command.value} executed successfully. Pressure data has been set to ${pressureVal}.`,
    time: command.time,
    state: 'success',
  });

  return updateCommandHistory({
    $state,
    command,
    status: 'success',
    output: `<p class="text-green-600">${command.value} executed successfully. Pressure data has been set to ${pressureVal} </p>`,
  });
}
