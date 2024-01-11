<script lang="ts">
  import mqttClient from '$lib/mqtt/mqtt';
  import { onMount } from 'svelte';
  import Payload from '@/components/pages/visualization/payload/Payload.svelte';
  import { gcsService } from '@/machines/gcs-machine';

  let interval: number;

  // onMount(() => {
  //   gcsService.send({ type: 'ACTIVATE' });

  //   mqttClient.payload.subscribe.all();
  //   interval = setInterval(() => {
  //     mqttClient.payload.publish.temperature();
  //     mqttClient.payload.publish.acceleration();
  //     mqttClient.payload.publish.altitude();
  //     mqttClient.payload.publish.gyroscope();
  //     mqttClient.payload.publish.humidity();
  //     mqttClient.payload.publish.pressure();
  //   }, 5000);

  //   return () => clearInterval(interval);
  // });
</script>

<section class="w-full [&>*]:border-surface-600 [&>*]:p-5">
  <div class="divide-y divide-surface-500">
    <Payload />
  </div>
</section>
