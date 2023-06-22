<script lang="ts">
  import BatteryIcon from '@components/icons/BatteryIcon.svelte';
  import H4 from '@components/ui/H4.svelte';
  import H5 from '@components/ui/H5.svelte';
  import H6 from '@components/ui/H6.svelte';

  let state = 'Prelounch';
  let batteryLevle = 100;

  let healthyPackets = 56;
  let CorruptedPackets = 10;
</script>

<div class="space-y-3">
  <div class="flex items-center">
    <header class="flex flex-1 items-end space-x-4">
      <H4>Payload</H4>
      <span class="flex items-end space-x-1">
        <H5>STATE :</H5>
        <H6 class="text-warning-500">{state}</H6>
      </span>
    </header>

    <button
      type="button"
      class="btn btn-sm variant-ghost-surface pointer-events-none"
    >
      <BatteryIcon />
      <span>{batteryLevle}%</span>
    </button>
  </div>

  <div class="flex space-x-3">
    <p>
      Healthy Packets : <span class="text-success-600">{healthyPackets}</span>
    </p>
    <p>
      Corrupted Packets : <span class="text-error-600">{CorruptedPackets}</span>
    </p>
  </div>
</div>
