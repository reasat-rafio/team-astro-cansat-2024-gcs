import mqtt, { MqttClient } from 'mqtt';

class MqttHandler {
	private mqttClient: MqttClient | null;
	private host: string;

	constructor() {
		this.mqttClient = null;
		this.host = 'mqtt://localhost:8080';
	}

	connect() {
		this.mqttClient = mqtt.connect(this.host);

		// Mqtt error calback
		this.mqttClient.on('error', (err) => {
			console.log(`ERROR: ${err}`);
			this.mqttClient?.end();
		});

		// Connection callback
		this.mqttClient.on('connect', () => {
			console.log(`mqtt client connected`);
		});

		this.mqttClient.subscribe('temperature', (err) => {
			if (err) {
				console.log(err);
			}
		});

		// When a message arrives, do magic
		this.mqttClient.on('message', async (topic, message) => {
			switch (topic) {
				case 'temperature':
					try {
						console.log(message);
					} catch (error) {
						console.log(error);
					}
					break;
				default:
					break;
			}
		});

		this.mqttClient.on('close', () => {
			console.log(`mqtt client disconnected`);
		});
	}

	// publish temperature
	sendTemperature() {
		const body = (50 + Math.random() * 20).toFixed(2);
		const core = (90 + Math.random() * 10).toFixed(2);
		const payload = (60 + Math.random() * 30).toFixed(2);
		const time = new Date().toLocaleTimeString();

		this.mqttClient?.publish(
			'temperature',
			JSON.stringify({
				body,
				core,
				payload,
				time
			})
		);
		console.log(
			`body temperature = ${body}F, core temperature = ${core}F, payload temperature = ${payload}F successfully published`
		);
	}
	// publish orbitPosition
	sendOrbitPosition() {
		const time = new Date().toLocaleString();
		const data = Math.random() * 200;
		this.mqttClient?.publish('orbitPosition', JSON.stringify({ time, data }));
	}
}

export default MqttHandler;
