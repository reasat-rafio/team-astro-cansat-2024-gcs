<script lang="ts">
  import BatteryIcon from '@/components/icons/BatteryIcon.svelte';
  import H3 from '@/components/ui/H3.svelte';
  import H5 from '@/components/ui/H5.svelte';
  import H6 from '@/components/ui/H6.svelte';
  import Button from '@/components/ui/button/button.svelte';
  import outputStore from '@/stores/output.store';
  // import gcsStore from '@/stores/gcs.store';
  import { onMount } from 'svelte';

  export let batteryLevel = 20;
  export let CorruptedPackets = 0;
  export let color: 'primary' | 'secondary' = 'primary';

  let _state = 'idle';
  let _healthyPackets = '82';

  // let _state = $gcsStore.actorRef.getSnapshot().context.state;
  // let _healthyPackets =
  //   $gcsStore.actorRef.getSnapshot().context.sensorData.packetCount;

  // onMount(() => {
  //   const subscriber = $gcsStore.actorRef.subscribe((state) => {
  //     if (state.context) {
  //       _state = state.context.state;
  //       _healthyPackets = state.context.sensorData.packetCount;
  //     }
  //   });

  //   return () => subscriber.unsubscribe();
  // });
</script>

<div class="space-y-3">
  <div class="flex items-center">
    <header class="flex flex-1 items-end space-x-4">
      <span class="flex items-end space-x-1">
        <H5>STATE :</H5>
        <H6 class="capitalize text-yellow-500">
          {$outputStore.activeState}
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
      Total Packets : <span class="text-green-600">
        {$outputStore.packetCount}
      </span>
    </p>

    <p>
      Healthy Packets : <span class="text-green-600">
        {$outputStore.healthyPacket}
      </span>
    </p>
    <p>
      Corrupted Packets : <span class="text-red-600">
        {$outputStore.unhealthyPacket}
      </span>
    </p>
    <p>
      Packets Lost : <span class="text-red-600">
        {$outputStore.packetLoss}
      </span>
    </p>
  </div>
</div>
