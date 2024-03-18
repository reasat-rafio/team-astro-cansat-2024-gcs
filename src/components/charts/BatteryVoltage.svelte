<script lang="ts">
  import { formatDate } from '@/lib/helper';
  import { batteryVoltageStore } from '@/stores/sensor.data.store';
  import {
    VisXYContainer,
    VisLine,
    VisAxis,
    VisCrosshair,
    VisTooltip,
    VisBulletLegend,
  } from '@unovis/svelte';
  import { onMount } from 'svelte';

  export let width: string | number = 600;

  type Data = { x: string; y: number };
  let data: Data[] = [];
  const x = (d: Data) => new Date(d.x).getTime();
  const y = (d: Data) => d.y;
  let loaded = false;
  const colors = ['#2563EB'];
  const items = [{ name: 'BATTERY_VOLTAGE', color: colors[0] }];
  const template = (d: Data) =>
    `<span>time :  ${d.x}<br / > value : ${d.y} </ span>`;
  const tickFormat = (value: string) => formatDate(new Date(value));

  $: if ($batteryVoltageStore?.currentVal && loaded) {
    const y = +$batteryVoltageStore.currentVal?.value;
    const x = $batteryVoltageStore.currentVal.time;

    data.push({ x, y });
    data = data;
  }

  onMount(() => {
    const history = $batteryVoltageStore.history;
    if (!!history?.length)
      history.forEach(({ time, value }) => {
        const y = +value;
        const x = time;
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
