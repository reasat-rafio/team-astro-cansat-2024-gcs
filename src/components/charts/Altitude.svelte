<script lang="ts">
  import { calculatedAltitude, formatDate } from '@/lib/helper';
  import csvStore, { activeStreamObj } from '@/stores/csv.temp.store';
  import {
    VisAxis,
    VisBulletLegend,
    VisCrosshair,
    VisLine,
    VisTooltip,
    VisXYContainer,
  } from '@unovis/svelte';
  import { onMount } from 'svelte';

  export let width: string | number = 600;

  type Data = { x: string; y: number };
  let data: Data[] = [];
  const x = (d: Data) => new Date(d.x).getTime();
  const y = (d: Data) => d.y;
  let loaded = false;
  const colors = ['#2563EB'];
  const items = [{ name: 'ALTITUDE', color: colors[0] }];
  const template = (d: Data) =>
    `<span>time :  ${d.x}<br / > value : ${d.y} </ span>`;
  const tickFormat = (value: string) => formatDate(new Date(value));

  $: if ($activeStreamObj && loaded) {
    const y = calculatedAltitude(+$activeStreamObj.ATMOSPHERIC_PRESSURE);
    const x = $activeStreamObj.GPS_TIME;

    data.push({ x, y });
    data = data;
  }

  onMount(() => {
    const streams = $csvStore.streamsObj;
    if (streams)
      streams.forEach((stream) => {
        const y = calculatedAltitude(+stream.ATMOSPHERIC_PRESSURE);
        const x = stream.GPS_TIME;
        data.push({ x, y });
        data = data;
      });
    loaded = true;
  });
</script>

<div class="h-full">
  <VisXYContainer preventEmptyDomain {width} class="h-full" {data}>
    <VisBulletLegend {items} />
    <VisAxis gridLine={false} type="x" label="Time" numTicks={6} {tickFormat} />
    <VisLine {x} {y} />
    <VisAxis gridLine={true} type="y" label="Value" />
    <VisCrosshair {template} />
    <VisTooltip />
  </VisXYContainer>
</div>
