<script lang="ts">
  import Header from '../Header.svelte';
  import Item from './Item.svelte';
  import { Zap } from 'lucide-svelte';
  import { ScrollArea } from '@/components/ui/scroll-area/index.js';
  import outputStore from '@/stores/output.store';
</script>

<ScrollArea class="h-full w-full p-4">
  <Header icon={Zap} title="Outputs" />

  <div class="mt-5 flex flex-col gap-y-4">
    <Item formatKey="TEAM_ID" value={$outputStore.teamId} />
    <Item formatKey="MISSION_TIME" value={$outputStore.missionTime} />
    <Item formatKey="PACKET_COUNT" value={$outputStore.packetCount} />
    <Item
      formatKey="HEALTHY_PACKET"
      value={String(
        parseInt($outputStore.packetCount) -
          (parseInt($outputStore.unhealthyPacket) +
            parseInt($outputStore.packetLoss)),
      )} />
    <Item
      formatKey="UNHEALTHY_PACKET"
      color="error"
      value={$outputStore.unhealthyPacket} />
    <Item
      formatKey="PACKET_LOSS"
      color="error"
      value={$outputStore.packetLoss} />
    <Item formatKey="MODE" value={$outputStore.activeMode} />
    <Item formatKey="STATE" value={$outputStore.activeState} />
    <Item formatKey="ALTITUDE" value={$outputStore.altitude} />
    <Item formatKey="AIR_SPEED" value={String($outputStore.airSpeed)} />
    <Item formatKey="HS_DEPLOYED" value={String($outputStore.hsDeployed)} />
    <Item formatKey="PC_DEPLOYED" value={String($outputStore.pcDeployed)} />
    <Item formatKey="TEMPERATURE" value={$outputStore.temperature} />
    <Item formatKey="VOLTAGE" value={$outputStore.voltage} />
    <Item formatKey="PRESSURE" value={$outputStore.pressure} />
    <Item formatKey="GPS_TIME" value={$outputStore.gpsTime} />
    <Item formatKey="GPS_ALTITUDE" value={$outputStore.gpsAltitude} />
    <Item formatKey="GPS_LATITUDE" value={$outputStore.gpsLatitude} />
    <Item formatKey="GPS_LONGITUDE" value={$outputStore.gpsLongitude} />
    <Item formatKey="GPS_SATS" value={$outputStore.gpsStas} />
    <Item formatKey="TILT_X" value={$outputStore.tiltX} />
    <Item formatKey="TILT_Y" value={$outputStore.tiltY} />
    <Item formatKey="ROT_Z" value={$outputStore.rotZ} />
    <Item formatKey="CMD" value={$outputStore.cmdEcho} />
  </div>
</ScrollArea>
