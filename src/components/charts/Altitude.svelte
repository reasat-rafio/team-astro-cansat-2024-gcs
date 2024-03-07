<script lang="ts">
  import { calculatedAltitude, formatDate } from '@/lib/helper';
  import csvStore from '@/stores/csv.temp.store';
  import {
    VisXYContainer,
    VisLine,
    VisAxis,
    VisCrosshair,
    VisTooltip,
  } from '@unovis/svelte';

  type Data = { x: string; y: number };

  let x = (d: Data) => new Date(d.x).getTime();
  let y = (d: Data) => d.y;

  const template = (d: Data) => [d.x, d.y].join(', ');
  const tickFormat = (value: string) => formatDate(new Date(value));
  let data: Data[] = [];

  $: if ($csvStore.activeStreamObj) {
    const y = calculatedAltitude(
      +$csvStore.activeStreamObj.ATMOSPHERIC_PRESSURE,
    );
    const x = $csvStore.activeStreamObj.GPS_TIME;

    data.push({ x, y });
    data = data;
  }
</script>

<div class="h-full">
  <h3 class=" text-[#6a48f2]">Altitude</h3>
  <VisXYContainer preventEmptyDomain width={600} class="h-full" {data}>
    <VisAxis gridLine={false} type="x" label="Time" numTicks={6} {tickFormat} />
    <VisLine {x} {y} />
    <VisAxis gridLine={true} type="y" label="Value" />
    <VisCrosshair {template} />
    <VisTooltip />
  </VisXYContainer>
</div>
