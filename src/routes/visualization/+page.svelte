<script lang="ts">
  import mqttClient from '$lib/mqtt/mqtt';
  import Container from '@components/pages/visualization/container/Container.svelte';
  import Payload from '@components/pages/visualization/Payload.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    mqttClient.subToContainerTemp();

    const interval = setInterval(() => {
      mqttClient.pubContainerTemperature();
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
