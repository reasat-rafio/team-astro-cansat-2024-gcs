import { writable } from 'svelte/store';

interface OutPutStore {
  teamId: string;
  missionTime: string;
  packetCount: string;
  // healthyPacket: string;
  unhealthyPacket: string;
  packetLoss: string;
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
    // healthyPacket: '0',
    unhealthyPacket: '0',
    packetLoss: '0',
    activeMode: '0',
    activeState: 'IDLE',
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

  function updatePacketCount(packetCount: string) {
    update((store) => {
      return {
        ...store,
        packetCount,
      };
    });
  }

  function updatePacketLoss(packetLoss: number) {
    update((store) => {
      return {
        ...store,
        packetLoss: String(parseInt(store.packetLoss) + packetLoss),
      };
    });
  }

  function incrementUnhealthyPacket() {
    update((store) => {
      return {
        ...store,
        unhealthyPacket: (parseInt(store.unhealthyPacket) + 1).toString(),
      };
    });
  }

  function setUnhealthyPacket(data: string) {
    update((store) => {
      return {
        ...store,
        unhealthyPacket: data,
      };
    });
  }

  function resetMissionTime() {
    update((store) => {
      return {
        ...store,
        missionTime: '0',
      };
    });
  }

  function resetPacketLoss() {
    update((store) => {
      return {
        ...store,
        packetLoss: '0',
      };
    });
  }

  function updateOutput(
    data: Omit<OutPutStore, 'packetLoss' | 'unhealthyPacket' | 'healthyPacket'>,
  ) {
    update((store) => {
      return { ...store, ...data };
    });
  }

  function clearOutput() {
    set({
      teamId: '2043',
      missionTime: '0',
      packetCount: '0',
      // healthyPacket: '0',
      unhealthyPacket: '0',
      packetLoss: '0',
      activeMode: '0',
      activeState: 'IDLE',
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
  }

  return {
    set,
    update,
    subscribe,
    updateOutput,
    updatePacketLoss,
    updatePacketCount,
    setUnhealthyPacket,
    resetPacketLoss,
    resetMissionTime,
    clearOutput,
    incrementUnhealthyPacket,
  };
}

const outputStore = createOutputStore();
export default outputStore;
