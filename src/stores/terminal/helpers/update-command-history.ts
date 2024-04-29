import type { UpdateCommandHistory } from '@/lib/@types/app.types';
import commandHistoryStore from '@/stores/command.history.store';
import { getTheIndexOfTheCommand } from '../terminal.store';

export default function updateCommandHistory({
  currentState,
  command,
  output,
  status,
}: UpdateCommandHistory) {
  commandHistoryStore.setCommandHistory({ ...command, output, status });
  return {
    ...currentState,
    currentCommand: command,
    currentCommandIdx:
      status === 'error'
        ? currentState.currentCommandIdx
        : getTheIndexOfTheCommand(command.value),
  };
}
