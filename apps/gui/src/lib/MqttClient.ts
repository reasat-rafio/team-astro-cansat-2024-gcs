import mqtt from 'mqtt';

const brokerUrl = 'mqtt://localhost:8080';
// const topic = 'my/topic';

export const mqttClient = mqtt.connect(brokerUrl);

mqttClient.on('connect', function () {
	console.log('Connected to MQTT broker');
});

mqttClient.on('error', (err) => {
	console.log(`MQTT client Error: ${err}`);
	mqttClient.end();
});

// Publish a message
// const message = 'Hello, MQTT!';
// mqttClient.publish(topic, message, { qos: 1 }, (error?: Error) => {
// 	if (error) {
// 		console.error('Failed to publish message:', error);
// 	} else {
// 		console.log('Message published successfully');
// 	}
// });
