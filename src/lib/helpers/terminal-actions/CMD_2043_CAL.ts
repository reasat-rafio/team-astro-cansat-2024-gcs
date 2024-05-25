import type { TerminalCommand, TerminalType } from '@/lib/@types/app.types';
import mqttHandler from '@/lib/mqtt';
import commandHistoryStore from '@/stores/command.history.store';
import { addLog } from '@/stores/log.store';
import outputStore from '@/stores/output.store';
import getSuccessOutput from '@/stores/terminal/helpers/get-current-success-output';
import updateCommandHistory from '@/stores/terminal/helpers/update-command-history';

interface Type {
  $state: TerminalType;
  command: TerminalCommand;
}

export default function CMD_2043_CAL({ $state, command }: Type) {
  const successMessage = getSuccessOutput(command.value);
  mqttHandler.client.publish('ground_station/commands', 'CAL');
  outputStore.updatePacketCount('0');
  outputStore.updatePacketLoss(0);
  outputStore.setUnhealthyPacket('0');
  outputStore.resetMissionTime();
  outputStore.resetPacketLoss();

  addLog({
    value: `${command.value} executed successfully. ${successMessage}.`,
    time: command.time,
    state: 'success',
  });

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
