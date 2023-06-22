<script lang="ts">
  import mqttClient from '$lib/mqtt';
  import Camera from '@components/pages/visualization/Camera.svelte';
  import Container from '@components/pages/visualization/container/Container.svelte';
  import Gps from '@components/pages/visualization/GPS.svelte';
  import Payload from '@components/pages/visualization/Payload.svelte';
  import { navbarHeight } from '@stores/ui.store.';
  import { onMount } from 'svelte';

  onMount(() => {
    mqttClient.subToTemp();
    mqttClient.subToVoltage();
  });
</script>

<section
  style="height: calc(100vh - {$navbarHeight}px);"
  class="grid w-full grid-cols-12 grid-rows-2 [&>*]:border-surface-600 [&>*]:p-5"
>
  <Container class="col-span-8 border-r" />
  <Gps class="col-span-4" />
  <Payload class="col-span-8 border-r border-t" />
  <Camera class="col-span-4 border-t" />
</section>
