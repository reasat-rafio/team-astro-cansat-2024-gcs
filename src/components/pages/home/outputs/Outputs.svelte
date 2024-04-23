<script lang="ts">
  import { onMount } from 'svelte';
  import Header from '../Header.svelte';
  import Item from './Item.svelte';
  import { Zap } from 'lucide-svelte';
  import { ScrollArea } from '@/components/ui/scroll-area/index.js';

  let _teamId = '';
  let missionTime = '';
  let hsDeployed = false;
  let pcDeployed = false;
  let packetCount = '';
  let activeMode = '';
  let activeState = '';
  let latestAltitude = '';
  let temperature = '';
  let latestTilt = { x: '', y: '' };
  let latestGps = {
    time: '',
    altitude: '',
    latitude: '',
    longitude: '',
    // sats: '',
  };

  onMount(() => {});
</script>

<ScrollArea class="h-full w-full p-4">
  <Header icon={Zap} title="Outputs" />

  <div class="mt-5 flex flex-col gap-y-4">
    <Item formatKey="Team Id" value={_teamId} />
    <Item formatKey="Mission Time" value={missionTime} />
    <Item formatKey="Packet Count" value={packetCount} />
    <Item formatKey="Mode" value={activeMode} />
    <Item formatKey="State" value={activeState} />
    <Item formatKey="Altitude" value={latestAltitude} />
    <Item formatKey="Hs Deployed" value={String(hsDeployed)} />
    <Item formatKey="Pc Deployed" value={String(pcDeployed)} />
    <Item formatKey="Mast Raised" value="True" />
    <Item formatKey="Temperature" value={temperature} />
    <Item formatKey="Voltage" value="12V" />
    <Item formatKey="Gps Time" value={latestGps.time} />
    <Item formatKey="Gps Altitude" value={latestGps.altitude} />
    <Item formatKey="Gps Latitude" value={latestGps.latitude} />
    <Item formatKey="Gps Longitude" value={latestGps.longitude} />
    <Item formatKey="Gps Sats" value="8" />
    <Item formatKey="Tilt X" value={latestTilt.x} />
    <Item formatKey="Tilt Y" value={latestTilt.y} />
  </div>
</ScrollArea>
