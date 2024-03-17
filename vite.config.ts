import { sveltekit } from '@sveltejs/kit/vite';
import { type ViteDevServer, defineConfig } from 'vite';
import { SerialPort } from 'serialport';
import { Server } from 'socket.io';

const webSocketServer = {
  name: 'webSocketServer',
  configureServer(server: ViteDevServer) {
    if (!server.httpServer) return;

    // Define serial port settings
    const portName = '/dev/ttyUSB0'; // Change this to your serial port
    const baudRate = 9600; // Change this to match your device settings

    // Create a socket io server
    const socket = new Server(server.httpServer);

    // Create a new serial port instance
    const serialPort = new SerialPort({
      path: portName,
      baudRate: baudRate,
      autoOpen: false,
    });

    // Open the serial port
    serialPort.on('open', () => {
      console.log('Serial port opened');
    });

    // Handle incoming serial data
    serialPort.on('data', (data) => {
      const serialData = data.toString(); // Assuming data is UTF-8 encoded string
      console.log('Received serial data:', serialData);

      // Emit the data to all connected clients
      socket.emit('serialData', serialData);
    });

    socket.on('connection', () => {
      socket.emit('eventFromServer', 'Hello, World 👋');
    });
  },
};

export default defineConfig({
  plugins: [sveltekit(), webSocketServer],
  resolve: {
    alias: {
      mqtt: 'mqtt/dist/mqtt.js',
      $components: './src/components/*',
      $store: './src/store/*',
    },
  },
});
