import mqtt from 'mqtt';
import chalk from 'chalk';
import type { MqttClient } from 'mqtt';

class MqttHandler {
	private mqttClient: MqttClient | null;
	private host: string | null = null;

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

		// When a message arrives, do magic
		this.mqttClient.on('message', async (topic, message) => {
			let decodedMessage: string;
			const decoder = new TextDecoder('utf8');

			switch (topic) {
				case 'temperature':
					try {
						decodedMessage = decoder.decode(message);
						console.log(
							`type = ${chalk.bold.bgBlue('sub')}, topic = ${chalk.bold.bgGreen(
								topic
							)}, message = ${chalk.bold.bgRed(decodedMessage)}`
						);
					} catch (error) {
						console.log(error);
					}
					break;
				case 'orbit':
					try {
						decodedMessage = decoder.decode(message);
						console.log(
							`type = ${chalk.bold.bgBlue('sub')}, topic = ${chalk.bold.bgGreen(
								topic
							)}, message = ${chalk.bold.bgRed(decodedMessage)}`
						);
					} catch (error) {
						console.log('error');
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

	subToTemp() {
		this.mqttClient?.subscribe('temperature', (err) => {
			if (err) console.log(err);
		});
	}

	subToOrbit() {
		this.mqttClient?.subscribe('orbit', (err) => {
			if (err) console.log(err);
		});
	}

	isConnected() {
		return this.mqttClient?.connected;
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
			`type = ${chalk.bold.bgRed('pub')}, topic = ${chalk.bold.bgGreen(
				'temperature'
			)}, message = ${chalk.bold.bgBlue(
				`body temperature = ${body}F, core temperature = ${core}F, payload temperature = ${payload}F successfully published`
			)}`
		);
	}
	// publish orbitPosition
	sendOrbitPosition() {
		const time = new Date().toLocaleString();
		const data = Math.random() * 200;
		this.mqttClient?.publish('orbit', JSON.stringify({ time, data }));
		console.log(
			`type = ${chalk.bold.bgRed('pub')}, topic = ${chalk.bold.bgGreen(
				'orbit'
			)}, message = ${chalk.bold.bgBlue(`time = ${time}s, data = ${data} `)}`
		);
	}
}

export default MqttHandler;
