<script lang="ts">
  import formatDate from '@/lib/helpers/format-date';
  import { gpsCoordinatesStore } from '@/stores/sensor.data.store';
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

  type Data = {
    x: Date;
    y: {
      x: number;
      y: number;
      z: number;
    };
  };

  let loaded = false;
  const x = (d: Data) => d.x;
  const y = [(d: Data) => d.y.x, (d: Data) => d.y.y, (d: Data) => d.y.z];
  const colors = ['#2563EB', '#EB6C25', '#6a48f2'];
  // const color = (_: Data, i: number) => colors[i];
  const items = [
    { name: 'GPS_ALTITUDE', color: colors[0] },
    { name: 'GPS_LATITUDE', color: colors[1] },
    { name: 'GPS_LONGITUDE', color: colors[2] },
  ];

  const template = (d: Data) =>
    `<span>time :  ${formatDate(d.x)}<br /> altitude : ${d.y.x}<br /> latitude : ${d.y.y}<br /> longitude : ${d.y.z}<br /> </ span>`;
  const tickFormat = (value: Date) => formatDate(value);
  let data: Data[] = [];
  let selection: number[] = [];
  $: xDomain = selection as [number, number] | undefined;

  $: if ($gpsCoordinatesStore?.currentVal && loaded) {
    const { time, value } = $gpsCoordinatesStore.currentVal;

    const y = { x: +value.x, y: +value.y, z: +value.z };
    const x = time;

    data.push({ x, y });
    data = data;
  }

  onMount(() => {
    const history = $gpsCoordinatesStore.history;
    if (!!history?.length)
      history.forEach(({ value, time }) => {
        const x = time;
        const y = { x: +value.x, y: +value.y, z: +value.z };
        data.push({ x, y });
        data = data;
      });
    loaded = true;
  });
  formatDate;

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
