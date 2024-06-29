import type { UpdateCommandHistory } from '@/lib/@types/app.types';
import commandHistoryStore from '@/stores/command.history.store';
// import { getTheIndexOfTheCommand } from '../terminal.store';

export default function updateCommandHistory({
  $state,
  command,
  output,
  status,
}: UpdateCommandHistory) {
  commandHistoryStore.setCommandHistory({ ...command, output, status });
  return {
    ...$state,
    currentCommand: command,
    currentCommandIdx: 0,
  };
}
