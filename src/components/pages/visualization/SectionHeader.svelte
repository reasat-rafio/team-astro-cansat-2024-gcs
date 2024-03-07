<script lang="ts">
  import BatteryIcon from '@/components/icons/BatteryIcon.svelte';
  import H3 from '@/components/ui/H3.svelte';
  import H5 from '@/components/ui/H5.svelte';
  import H6 from '@/components/ui/H6.svelte';
  import Button from '@/components/ui/button/button.svelte';
  import gcsStore from '@/stores/gcs.store';
  import { onMount } from 'svelte';

  export let title: string;
  export let batteryLevel = 20;
  export let CorruptedPackets = 0;
  export let color: 'primary' | 'secondary' = 'primary';

  let _state = $gcsStore.actorRef.getSnapshot().context.state;
  let _healthyPackets =
    $gcsStore.actorRef.getSnapshot().context.sensorData.packetCount;

  onMount(() => {
    const subscriber = $gcsStore.actorRef.subscribe((state) => {
      if (state.context) {
        _state = state.context.state;
        _healthyPackets = state.context.sensorData.packetCount;
      }
    });

    return () => subscriber.unsubscribe();
  });
</script>

<div class="space-y-3">
  <div class="flex items-center">
    <header class="flex flex-1 items-end space-x-4">
      <H3
        class="{color === 'primary'
          ? 'text-primary'
          : 'text-[#6a48f2]'} underline">
        {title}
      </H3>
      <span class="flex items-end space-x-1">
        <H5>STATE :</H5>
        <H6 class="capitalize text-yellow-500">
          {_state}
        </H6>
      </span>
    </header>

    <Button variant="outline" class="pointer-events-none space-x-2">
      <BatteryIcon />
      <span>{batteryLevel}%</span>
    </Button>
  </div>

  <div class="flex space-x-3">
    <p>
      Healthy Packets : <span class="text-green-600">
        {_healthyPackets}
      </span>
    </p>
    <p>
      Corrupted Packets : <span class="text-red-600">{CorruptedPackets}</span>
    </p>
  </div>
</div>
