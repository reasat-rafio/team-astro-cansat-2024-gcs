<script lang="ts">
  import { formatDate } from '@/lib/helper';
  import { tiltAngleStore } from '@/stores/sensor.data.store';
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

  type Data = {
    x: string;
    y: {
      x: number;
      y: number;
      z: number;
    };
  };

  let loaded = false;
  const x = (d: Data) => new Date(d.x).getTime();
  const y = [(d: Data) => d.y.x, (d: Data) => d.y.y, (d: Data) => d.y.z];
  const colors = ['#2563EB', '#EB6C25', '#6a48f2'];
  const color = (_: Data, i: number) => colors[i];
  const items = [
    { name: 'TILT_X', color: colors[0] },
    { name: 'TILT_Y', color: colors[1] },
    { name: 'ROT_Z', color: colors[2] },
  ];

  const template = (d: Data) =>
    `<span>time :  ${d.x}<br /> tilt x : ${d.y.x}<br /> tilt y : ${d.y.y}<br /> rot z : ${d.y.z}<br /> </ span>`;
  const tickFormat = (value: string) => formatDate(new Date(value));
  let data: Data[] = [];

  $: if ($tiltAngleStore?.currentVal && loaded) {
    const { time, value } = $tiltAngleStore.currentVal;

    const y = { x: +value.x, y: +value.y, z: +value.z };
    const x = time;

    data.push({ x, y });
    data = data;
  }

  onMount(() => {
    const history = $tiltAngleStore.history;
    if (!!history?.length)
      history.forEach(({ value, time }) => {
        const x = time;
        const y = { x: +value.x, y: +value.y, z: +value.z };
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
    <VisLine {x} {y} {color} />
    <VisAxis gridLine={true} type="y" label="Value" />
    <VisCrosshair {template} />
    <VisTooltip />
  </VisXYContainer>
</div>
