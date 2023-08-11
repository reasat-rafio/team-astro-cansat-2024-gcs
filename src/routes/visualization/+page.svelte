<script lang="ts">
  import mqttClient from '$lib/mqtt/mqtt';
  import Container from '@components/pages/visualization/container/Container.svelte';
  import Payload from '@components/pages/visualization/Payload.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    mqttClient.container.subscribe.all();

    const interval = setInterval(() => {
      mqttClient.container.publish.temperature();
    }, 2000);

    return () => clearInterval(interval);
  });
</script>

<section class="w-full [&>*]:border-surface-600 [&>*]:p-5">
  <div class="space-y-10">
    <Container />
    <Payload />
  </div>
</section>
