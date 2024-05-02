<script lang="ts">
  import Header from '../Header.svelte';
  import Item from './Item.svelte';
  import { Zap } from 'lucide-svelte';
  import { ScrollArea } from '@/components/ui/scroll-area/index.js';

  let TEAM_ID = '2043';
  let MISSION_TIME = '';
  let PACKET_COUNT = '0';
  let ACTIVE_MODE = 'GROUND';
  let ACTIVE_STATE = '';
  let ALTITUDE = '';
  let AIR_SPEED = '';
  let HS_DEPLOYED = 'True';
  let PC_DEPLOYED = 'True';
  let TEMPERATURE = '';
  let VOLTAGE = '12V';
  let PRESSURE = '132';
  let GPS_TIME = '12:00:00';
  let GPS_ALTITUDE = '0';
  let GPS_LATITUDE = '0';
  let GPS_LONGITUDE = '0';
  let GPS_SATS = '0';
  let TILT_X = '0';
  let TILT_Y = '0';
  let TILT_Z = '0';
  let ROT_Z = '0';
  let CMD_ECHO = '0';
</script>

<ScrollArea class="h-full w-full p-4">
  <Header icon={Zap} title="Outputs" />

  <div class="mt-5 flex flex-col gap-y-4">
    <Item formatKey="TEAM_ID" value={TEAM_ID} />
    <Item formatKey="MISSION_TIME" value={MISSION_TIME} />
    <Item formatKey="PACKET_COUNT" value={PACKET_COUNT} />
    <Item formatKey="MODE" value={ACTIVE_MODE} />
    <Item formatKey="STATE" value={ACTIVE_STATE} />
    <Item formatKey="ALTITUDE" value={ALTITUDE} />
    <Item formatKey="AIR_SPEED" value={String(AIR_SPEED)} />
    <Item formatKey="HS_DEPLOYED" value={String(HS_DEPLOYED)} />
    <Item formatKey="PC_DEPLOYED" value={PC_DEPLOYED} />
    <Item formatKey="TEMPERATURE" value={TEMPERATURE} />
    <Item formatKey="VOLTAGE" value={VOLTAGE} />
    <Item formatKey="PRESSURE" value={PRESSURE} />
    <Item formatKey="GPS_TIME" value={GPS_TIME} />
    <Item formatKey="GPS_ALTITUDE" value={GPS_ALTITUDE} />
    <Item formatKey="GPS_LATITUDE" value={GPS_LATITUDE} />
    <Item formatKey="GPS_LONGITUDE" value={GPS_LONGITUDE} />
    <Item formatKey="GPS_SATS" value={GPS_SATS} />
    <Item formatKey="TILT_X" value={TILT_X} />
    <Item formatKey="TILT_Y" value={TILT_Y} />
    <Item formatKey="TILT_Z" value={TILT_Z} />
    <Item formatKey="ROT_Z" value={ROT_Z} />
    <Item formatKey="CMD_ECHO" value={CMD_ECHO} />
  </div>
</ScrollArea>
