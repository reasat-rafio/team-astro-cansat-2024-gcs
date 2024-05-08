<script lang="ts">
  import formatDate from '@/lib/helpers/format-date';
  import { batteryVoltageStore } from '@/stores/sensor.data.store';
  import {
    VisXYContainer,
    VisLine,
    VisAxis,
    VisCrosshair,
    VisTooltip,
    VisBulletLegend,
    VisBrush,
  } from '@unovis/svelte';
  import { onMount } from 'svelte';

  export let width: string | number = 600;

  type Data = { x: Date; y: number };
  let data: Data[] = [];
  const x = (d: Data) => d.x;
  const y = (d: Data) => d.y;
  let loaded = false;
  const colors = ['#2563EB'];
  const items = [{ name: 'BATTERY_VOLTAGE', color: colors[0] }];
  const template = (d: Data) =>
    `<span>time :  ${formatDate(d.x)}<br / > value : ${d.y.toFixed(2)} </ span>`;
  const tickFormat = (value: Date) => formatDate(value);
  let selection: number[] = [];
  $: xDomain = selection as [number, number] | undefined;

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

  function updateDomain(
    selection: [number, number],
    _: unknown,
    userDriven: boolean,
  ) {
    if (userDriven) xDomain = selection;
  }
</script>

<div class="h-full">
  <VisXYContainer {xDomain} preventEmptyDomain {width} class="h-[500px]" {data}>
    <VisBulletLegend {items} />
    <VisAxis gridLine={false} type="x" label="Time" numTicks={6} {tickFormat} />
    <VisLine {x} {y} />
    <VisAxis gridLine={true} type="y" label="Value" />
    <VisCrosshair {template} />
    <VisTooltip />
  </VisXYContainer>
  <VisXYContainer preventEmptyDomain {width} class="h-[100px]" {data}>
    <VisAxis gridLine={false} type="x" numTicks={6} {tickFormat} />
    <VisBrush bind:selection onBrush={updateDomain} draggable={true} />
    <VisLine {x} {y} />
    <VisAxis gridLine={true} type="y" />
  </VisXYContainer>
</div>
