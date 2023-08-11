<script lang="ts">
  import mqttClient from '$lib/mqtt/mqtt';
  import Container from '@components/pages/visualization/container/Container.svelte';
  import Payload from '@components/pages/visualization/Payload.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    mqttClient.container.subscribe.all();
    mqttClient.payload.subscribe.all();

    const interval = setInterval(() => {
      mqttClient.container.publish.temperature();
      mqttClient.container.publish.acceleration();
      mqttClient.container.publish.altitude();
      mqttClient.container.publish.gyroscope();
      mqttClient.container.publish.humidity();
      mqttClient.container.publish.pressure();

      mqttClient.payload.publish.temperature();
      mqttClient.payload.publish.acceleration();
      mqttClient.payload.publish.altitude();
      mqttClient.payload.publish.gyroscope();
      mqttClient.payload.publish.humidity();
      mqttClient.payload.publish.pressure();
    }, 5000);

    return () => clearInterval(interval);
  });
</script>

<section class="w-full [&>*]:border-surface-600 [&>*]:p-5">
  <div class="space-y-10">
    <Container />
    <Payload />
  </div>
</section>
