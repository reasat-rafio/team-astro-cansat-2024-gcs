<script lang="ts">
  import Charts from '@/components/pages/home/charts/Charts.svelte';
  import Outputs from '@/components/pages/home/outputs/Outputs.svelte';
  import Streams from '@/components/pages/home/streams/Streams.svelte';
  import SystemSteps from '@/components/pages/home/operation-status/OperationStatus .svelte';
  import { navbarHeight } from '@/stores/ui.store.';
  import * as Resizable from '@/components/ui/resizable';
  import { io } from 'socket.io-client';


  type Key = "Latitude" | "Longitude" | "Altitude (GPS)" | "Battery Voltage" | "Temperature From BMP280" | "Distance"
  type Data = [Key, string][]

  const socket = io();

  function splitStringIntoKeyValuePairs(input: string): { [key: string]: string } {
    const keyValuePairs: { [key: string]: string } = {};

    // Define regular expressions for each type of string
    const regexType1 = /([a-zA-Z_]+):\s?([0-9.]+|nan)/g;
    const regexType2 = /([a-zA-Z\s]+):\s?([0-9.]+)\s?([a-zA-Z]+)/g;

    // Try matching both regular expressions
    let match;
    while ((match = regexType1.exec(input)) !== null) {
        keyValuePairs[match[1]] = match[2];
    }
    while ((match = regexType2.exec(input)) !== null) {
        keyValuePairs[match[1]] = match[2] + ' ' + match[3];
    }

    return keyValuePairs;
}


  socket.on('eventFromServer', (message) => {
    console.log('eventFromServer', message);
  });

  socket.on('serialData', (message) => {
    console.log(splitStringIntoKeyValuePairs(message), message);
  });
</script>

<section style="height: calc(100vh - {$navbarHeight}px);" class="">
  <Resizable.PaneGroup direction="horizontal" class="w-full rounded-lg border">
    <Resizable.Pane defaultSize={25}>
      <SystemSteps />
    </Resizable.Pane>
    <Resizable.Handle />

    <Resizable.Pane defaultSize={15}>
      <Outputs />
    </Resizable.Pane>

    <Resizable.Handle />
    <Resizable.Pane defaultSize={60}>
      <Resizable.PaneGroup direction="vertical">
        <Resizable.Pane defaultSize={60}>
          <Charts />
        </Resizable.Pane>
        <Resizable.Handle />
        <Resizable.Pane defaultSize={40}>
          <Streams />
        </Resizable.Pane>
      </Resizable.PaneGroup>
    </Resizable.Pane>
  </Resizable.PaneGroup>
</section>
