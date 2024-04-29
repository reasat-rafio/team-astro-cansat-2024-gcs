import {
  CAL,
  CMD_2043_CX_ON,
  CMD_2043_SIM_ACTIVATE,
  CMD_2043_SIM_DISABLE,
  CMD_2043_SIM_ENABLE,
  CMD_2043_ST_GPS,
} from '@/lib/system-functions/';
import { validCommands } from '@/lib/helper';

export default function cmdAction(command: string) {
  switch (command as (keyof typeof validCommands)[number]) {
    case 'CMD,2043,CX,ON':
      return CMD_2043_CX_ON();

    case 'CMD,2043,SIM,ENABLE':
      return CMD_2043_SIM_ENABLE();

    case 'CMD,2043,SIM,ACTIVATE':
      return CMD_2043_SIM_ACTIVATE();

    case 'CMD,2043,SIM,DISABLE':
      return CMD_2043_SIM_DISABLE();

    case 'CMD,2043,ST,GPS':
      return CMD_2043_ST_GPS();

    case 'CAL':
      return CAL();

    case 'CMD,2043,SIM,<PRESSURE>':
      return {
        success: true,
        error: null,
      };

    default:
      return {
        error: "Command doesn't exist",
      };
  }
}
