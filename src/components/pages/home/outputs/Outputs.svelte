<script lang="ts">
  import ZapIcon from '@/components/icons/ZapIcon.svelte';
  import gcsStore from '@/stores/gcs.store';
  import { onMount } from 'svelte';
  import Header from '../Header.svelte';
  import Item from './Item.svelte';

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

  onMount(() => {
    const subscriber = $gcsStore.actorRef.subscribe(
      ({ context: { sensorData, mode, state, teamId } }) => {
        const altitude = sensorData.altitude.values;
        const tilt = sensorData.tiltAngle.values;
        const gpsCoords = sensorData.gpsCoordinates.values;
        const gpsTime = sensorData.gpsTime;
        const mtime = sensorData.missionTime;
        const temp = sensorData.temperature.values;

        _teamId = teamId;
        hsDeployed = sensorData.hsDeployed;
        pcDeployed = sensorData.pcDeployed;
        missionTime = mtime[mtime?.length - 1];
        latestAltitude = altitude[altitude?.length - 1];
        packetCount = sensorData.packetCount;
        activeMode = mode;
        activeState = state;
        temperature = temp[temp.length - 1];
        latestTilt = {
          x: tilt[tilt?.length - 1].x,
          y: tilt[tilt?.length - 1].y,
        };
        latestGps = {
          time: gpsTime[gpsTime?.length - 1],
          altitude: gpsCoords[gpsCoords?.length - 1].z,
          latitude: gpsCoords[gpsCoords?.length - 1].y,
          longitude: gpsCoords[gpsCoords?.length - 1].x,
        };
      },
    );

    return () => subscriber.unsubscribe();
  });
</script>

<section class="flex h-full p-4">
  <div class="w-full overflow-auto scrollbar-thin">
    <Header icon={ZapIcon} title="Outputs" />

    <div class="flex flex-col gap-y-4">
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
  </div>
</section>
