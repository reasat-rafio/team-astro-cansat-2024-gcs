import type { TerminalCommand, TerminalType } from '@/lib/@types/app.types';
import mqttHandler from '@/lib/mqtt';
import commandHistoryStore from '@/stores/command.history.store';
import { addLog } from '@/stores/log.store';
import { nanoid } from 'nanoid';

interface Type {
  $state: TerminalType;
  command: TerminalCommand;
}

export default function CMD_2043_ECHO({ $state, command }: Type) {
  mqttHandler.client.publish('ground_station/commands', 'ECHO');
  const msg = `${command.value} executed successfully. Waiting for response..`;

  commandHistoryStore.setCommandHistory({
    id: nanoid(),
    ...command,
    output: `<p>${msg}</p>`,
    status: 'pending',
  });

  //   setTimeout(() => {
  //     const updatedCommand = commandHistoryStore.getCommandHistoryById(
  //       command.id as string,
  //     );
  //     if (updatedCommand?.status === 'pending') {
  //       commandHistoryStore.setCommandHistory({
  //         ...updatedCommand,
  //         status: 'error',
  //       });

  //       addLog({
  //         value: `${command.value} execution failed. No response received.`,
  //         time: new Date(),
  //       });
  //     }
  //   }, 5000);

  addLog({ value: msg, time: command.time });

  return {
    ...$state,
    currentCommand: command,
    currentCommandIdx: 0,
  };
}
