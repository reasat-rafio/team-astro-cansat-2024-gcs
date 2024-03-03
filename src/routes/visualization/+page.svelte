<script lang="ts">
  // import mqttClient from '$lib/mqtt/mqtt';
  import { onMount } from 'svelte';
  import Charts from '@/components/charts/Charts.svelte';
  import gcsMachine from '@/machines/gcs-machine';

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

<section class="[&>*]:border-surface-600 w-full [&>*]:p-5">
  <div class="divide-surface-500 divide-y">
    <Charts />
  </div>
</section>
