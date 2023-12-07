<script lang="ts">
  import ZapIcon from '@/components/icons/ZapIcon.svelte';
  import Header from '../Header.svelte';
  import Item from './Item.svelte';
</script>

<section class="overflow-auto col-span-3 row-start-2 col-start-1">
  <Header icon={ZapIcon} title="Outputs" />

  <div class="flex flex-col gap-y-4">
    <Item formatKey="Team Id" value="1011" />
    <Item formatKey="Mission Time" value="8:54:14 AM" />
    <Item formatKey="Packet Count" value="121" />
    <Item formatKey="Mode" value="Flight" />
    <Item formatKey="State" value="Inflight" />
    <Item formatKey="Altitude" value="121" />
    <Item formatKey="Hs Deployed" value="True" />
    <Item formatKey="Pc Deployed" value="False" />
    <Item formatKey="Mast Raised" value="True" />
    <Item formatKey="Temperature" value="20°C" />
    <Item formatKey="Voltage" value="12V" />
    <Item formatKey="Gps Time" value="9:59:59" />
    <Item formatKey="Gps Altitude" value="498000" />
    <Item formatKey="Gps Latitude" value="37.7749°N" />
    <Item formatKey="Gps Longitude" value="122.4194°W" />
    <Item formatKey="Gps Sats" value="8" />
    <Item formatKey="Tilt X" value="0.5" />
    <Item formatKey="Tilt Y" value="-0.5" />
  </div>
</section>
