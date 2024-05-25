<script lang="ts">
  import BatteryIcon from '@/components/icons/BatteryIcon.svelte';
  import H5 from '@/components/ui/H5.svelte';
  import H6 from '@/components/ui/H6.svelte';
  import Button from '@/components/ui/button/button.svelte';
  import outputStore from '@/stores/output.store';
  import { onMount } from 'svelte';

  export let batteryLevel = 20;
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
        {parseInt($outputStore.packetCount) -
          (parseInt($outputStore.unhealthyPacket) +
            parseInt($outputStore.packetLoss))}
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
