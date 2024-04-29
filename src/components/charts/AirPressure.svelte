<script lang="ts">
  import formatDate from '@/lib/helpers/format-date';
  import { airPressureStore } from '@/stores/sensor.data.store';
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

  type Data = { x: string; y: number };
  let data: Data[] = [];
  const x = (d: Data) => new Date(d.x).getTime();
  const y = (d: Data) => d.y;
  let loaded = false;
  const colors = ['#2563EB'];
  const items = [{ name: 'AIR_PRESSURE', color: colors[0] }];
  const template = (d: Data) =>
    `<span>time :  ${d.x}<br / > value : ${d.y} </ span>`;
  const tickFormat = (value: string) => formatDate(new Date(value));
  let selection: number[] = [];
  $: xDomain = selection as [number, number] | undefined;

  $: if ($airPressureStore?.currentVal && loaded) {
    const y = +$airPressureStore.currentVal?.value;
    const x = $airPressureStore.currentVal.time;

    data.push({ x, y });
    data = data;
  }

  onMount(() => {
    const history = $airPressureStore.history;
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
