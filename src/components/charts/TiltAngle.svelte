<script lang="ts">
  import { formatDate } from '@/lib/helper';
  import csvStore from '@/stores/csv.temp.store';
  import {
    VisXYContainer,
    VisLine,
    VisAxis,
    VisCrosshair,
    VisTooltip,
    VisBulletLegend,
  } from '@unovis/svelte';

  type Data = {
    x: string;
    y: {
      x: number;
      y: number;
      z: number;
    };
  };

  const x = (d: Data) => new Date(d.x).getTime();
  const y = [(d: Data) => d.y.x, (d: Data) => d.y.y, (d: Data) => d.y.z];

  const template = (d: Data) => [d.x, d.y.x, d.y.y, d.y.z].join(', ');
  const tickFormat = (value: string) => formatDate(new Date(value));
  let data: Data[] = [];

  $: if ($csvStore.activeStreamObj) {
    const y = {
      x: +$csvStore.activeStreamObj.TILT_X,
      y: +$csvStore.activeStreamObj.TILT_Y,
      z: +$csvStore.activeStreamObj.ROT_Z,
    };
    const x = $csvStore.activeStreamObj.GPS_TIME;

    data.push({ x, y });
    data = data;
  }

  const colors = ['#2563EB', '#EB6C25', '#6a48f2'];
  const color = (_: Data, i: number) => colors[i];
  const items = [
    { name: 'TILT_X', color: colors[0] },
    { name: 'TILT_Y', color: colors[1] },
    { name: 'ROT_Z', color: colors[2] },
  ];
</script>

<div class="h-full">
  <VisXYContainer preventEmptyDomain width={600} class="h-full" {data}>
    <VisBulletLegend {items} />
    <VisAxis gridLine={false} type="x" label="Time" numTicks={6} {tickFormat} />
    <VisLine {x} {y} {color} />
    <VisAxis gridLine={true} type="y" label="Value" />
    <VisCrosshair {template} />
    <VisTooltip />
  </VisXYContainer>
</div>
