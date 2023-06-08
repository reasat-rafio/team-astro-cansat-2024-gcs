<script lang="ts">
	import MqttHandler from '$lib/mqtt';
	import { onMount } from 'svelte';
	const mqttClient = new MqttHandler();

	onMount(() => {
		mqttClient.connect();

		setInterval(() => {
			mqttClient.sendTemperature();
		}, 5000);
	});
</script>
