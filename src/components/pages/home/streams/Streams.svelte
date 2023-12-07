<script lang="ts">
  import RocketIcon from '@/components/icons/RocketIcon.svelte';
  import Header from '../Header.svelte';

  const data = [
    'Team Id, Mission Time, Packet Count, Mode, State, Altitude, Hs Deployed,Pc Deployed, Mast Raised, Temperature, Voltage, Gps Time, Gps Altitude,Gps Latitude, Gps Longitude, Gps Sats, Tilt X, Tilt Y, Cmd Echo',
    '123456, 10:00:00, 50, Launch, Inflight, 500000, True, False, True, 20°C, 12V, 9:59:59, 498000, 37.7749°N, 122.4194°W, 8, 0.5, -0.5, Success.',
    '123456, 10:00:00, 50, Launch, Inflight, 500000, True, False, True, 20°C, 12V, 9:59:59, 498000, 37.7749°N, 122.4194°W, 8, 0.5, -0.5, Success.',
    '123456, 10:00:00, 50, Launch, Inflight, 500000, True, False, True, 20°C, 12V, 9:59:59, 498000, 37.7749°N, 122.4194°W, 8, 0.5, -0.5, Success.',
    '123456, 10:00:00, 50, Launch, Inflight, 500000, True, False, True, 20°C, 12V, 9:59:59, 498000, 37.7749°N, 122.4194°W, 8, 0.5, -0.5, Success.',
    '123456, 10:00:00, 50, Launch, Inflight, 500000, True, False, True, 20°C, 12V, 9:59:59, 498000, 37.7749°N, 122.4194°W, 8, 0.5, -0.5, Success.',
    '123456, 10:00:00, 50, Launch, Inflight, 500000, True, False, True, 20°C, 12V, 9:59:59, 498000, 37.7749°N, 122.4194°W, 8, 0.5, -0.5, Success.',
    '123456, 10:00:00, 50, Launch, Inflight, 500000, True, False, True, 20°C, 12V, 9:59:59, 498000, 37.7749°N, 122.4194°W, 8, 0.5, -0.5, Success.',
    '123456, 10:00:00, 50, Launch, Inflight, 500000, True, False, True, 20°C, 12V, 9:59:59, 498000, 37.7749°N, 122.4194°W, 8, 0.5, -0.5, Success.',
    '123456, 10:00:00, 50, Launch, Inflight, 500000, True, False, True, 20°C, 12V, 9:59:59, 498000, 37.7749°N, 122.4194°W, 8, 0.5, -0.5, Success.',
    '123456, 10:00:00, 50, Launch, Inflight, 500000, True, False, True, 20°C, 12V, 9:59:59, 498000, 37.7749°N, 122.4194°W, 8, 0.5, -0.5, Success.',
    '123456, 10:00:00, 50, Launch, Inflight, 500000, True, False, True, 20°C, 12V, 9:59:59, 498000, 37.7749°N, 122.4194°W, 8, 0.5, -0.5, Success.',
    '123456, 10:00:00, 50, Launch, Inflight, 500000, True, False, True, 20°C, 12V, 9:59:59, 498000, 37.7749°N, 122.4194°W, 8, 0.5, -0.5, Success.',
    '123456, 10:00:00, 50, Launch, Inflight, 500000, True, False, True, 20°C, 12V, 9:59:59, 498000, 37.7749°N, 122.4194°W, 8, 0.5, -0.5, Success.',
    '123456, 10:00:00, 50, Launch, Inflight, 500000, True, False, True, 20°C, 12V, 9:59:59, 498000, 37.7749°N, 122.4194°W, 8, 0.5, -0.5, Success.',
    '123456, 10:00:00, 50, Launch, Inflight, 500000, True, False, True, 20°C, 12V, 9:59:59, 498000, 37.7749°N, 122.4194°W, 8, 0.5, -0.5, Success.',
    '123456, 10:00:00, 50, Launch, Inflight, 500000, True, False, True, 20°C, 12V, 9:59:59, 498000, 37.7749°N, 122.4194°W, 8, 0.5, -0.5, Success.',
    '123456, 10:00:00, 50, Launch, Inflight, 500000, True, False, True, 20°C, 12V, 9:59:59, 498000, 37.7749°N, 122.4194°W, 8, 0.5, -0.5, Success.'
  ];
</script>

<section class="overflow-auto col-span-6 row-start-2 col-start-7">
  <Header icon={RocketIcon} title="Streams" />

  <div class="flex flex-col gap-y-4">
    {#each data as d, index}
      <p>
        <span class="text-secondary-500">{index + 1}.</span>
        <span>{d} </span>
      </p>
    {/each}
  </div>
</section>
