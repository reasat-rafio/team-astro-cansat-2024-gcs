<script lang="ts">
	import mqtt from '$lib/mqtt';
	import prisma from '$lib/prisma';
	import { onMount } from 'svelte';

	const sendTemperature = async () => {
		const body = +(50 + Math.random() * 20).toFixed(2);
		const core = +(90 + Math.random() * 10).toFixed(2);
		const payload = +(60 + Math.random() * 30).toFixed(2);

		// const response = await prisma.temperature.create({ data: { body, core, payload } });

		// console.log('====================================');
		// console.log(response);
		// console.log('====================================');

		mqtt.publish(
			'temperature',
			JSON.stringify({
				body,
				core,
				payload
			})
		);
		console.log(
			`body temperature = ${body}F, core temperature = ${core}F, payload temperature = ${payload}F successfully published`
		);
	};

	onMount(() => {
		setInterval(() => {
			sendTemperature();
		}, 5000);
	});
</script>
