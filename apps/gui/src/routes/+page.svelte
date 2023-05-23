<script lang="ts">
	import mqtt from 'mqtt';

	const mqttClient = mqtt.connect('mqtt://localhost:8080');

	mqttClient.on('error', (err) => {
		console.log(`ERROR: ${err}`);
		mqttClient.end();
	});

	mqttClient.on('connect', function () {
		console.log('Yo');
	});
</script>
