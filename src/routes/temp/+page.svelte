<script lang="ts">
  import MqttHandler from '../../lib/mqtt/mqtt';
  import { onMount } from 'svelte';

  let publishTem = true;
  let timer: string | number | NodeJS.Timer | undefined;
  const mqttClient = new MqttHandler();

  onMount(() => {
    mqttClient.connect();
    mqttClient.subToOrbit();
    mqttClient.subToTemp();
  });

  $: if (publishTem) {
    timer = setInterval(() => {
      if (mqttClient.isConnected()) {
        mqttClient.pubTemperature();
      }
    }, 5000);
  } else clearInterval(timer);

  const publishOrbitData = () => {
    if (mqttClient.isConnected()) mqttClient.sendOrbitPosition();
  };
</script>

<div>
  <div class="flex">
    <label for="temp">Show Temp</label>
    <input bind:checked={publishTem} name="temp" type="checkbox" />
  </div>
  <button on:click={publishOrbitData}>Publish orbit data</button>
</div>
