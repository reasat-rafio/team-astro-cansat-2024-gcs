import { writable } from 'svelte/store';

interface OutPutStore {
  teamId: string;
  missionTime: string;
  packetCount: string;
  activeMode: string;
  activeState: string;
  altitude: string;
  airSpeed: string;
  hsDeployed: string;
  pcDeployed: string;
  temperature: string;
  voltage: string;
  pressure: string;
  gpsTime: string;
  gpsAltitude: string;
  gpsLatitude: string;
  gpsLongitude: string;
  gpsStas: string;
  tiltX: string;
  tiltY: string;
  rotZ: string;
  cmdEcho: string;
}

function createOutputStore() {
  const { subscribe, update, set } = writable<OutPutStore>({
    teamId: '2043',
    missionTime: '0',
    packetCount: '0',
    activeMode: '0',
    activeState: '0',
    altitude: '0',
    airSpeed: '0',
    hsDeployed: 'N',
    pcDeployed: 'N',
    temperature: '0',
    voltage: '0',
    pressure: '0',
    gpsTime: '0',
    gpsAltitude: '0',
    gpsLatitude: '0',
    gpsLongitude: '0',
    gpsStas: '0',
    tiltX: '0',
    tiltY: '0',
    rotZ: '0',
    cmdEcho: '0',
  });

  function updateOutput(data: OutPutStore) {
    update((store) => {
      return {
        ...store,
        ...data,
      };
    });
  }

  return {
    set,
    update,
    subscribe,
    updateOutput,
  };
}

const outputStore = createOutputStore();
export default outputStore;
