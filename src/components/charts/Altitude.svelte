<!-- <script lang="ts">
  import { Line } from 'svelte-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  } from 'chart.js';
  import { onMount } from 'svelte';
  import type { Point } from 'chart.js/dist/core/core.controller';
  import { delay } from '$lib/helper';
  import gcsStore from '@/stores/gcs.store';

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  );

  const { snapshot } = $gcsStore;
  let chart: ChartJS<'line', (number | Point)[], unknown> | undefined;
  let containerEl: HTMLDivElement;
  let lockToTheEnd = true;
  let labels: string[] = [];
  let data: string[] = [];

  $: {
    if ($snapshot.context.sensorData) {
      const sensorData = $snapshot.context.sensorData.altitude;
      labels = sensorData.time ?? [];
      data = sensorData.values ?? [];

      if (chart) {
        chart.data.datasets[0].data.push(+data[data.length - 1]);
        chart.data.labels?.push(labels[labels.length - 1]);
        chart.update();
        delay(10).then(autoScrollAction);
      }
    }
  }

  onMount(() => {
    if (!!chart) {
      labels.forEach((value) => chart?.data.labels?.push(value));
      data.forEach((value) => chart?.data.datasets[0].data?.push(+value));
      chart.update();
    }
  });

  function autoScrollAction() {
    if (containerEl && lockToTheEnd) {
      containerEl.scrollLeft = containerEl.scrollWidth;
    }
  }
</script>

<section class={$$props.class}>
  <div class="flex">
    <h4 class="flex-1 ml-5 h6 text-tertiary-500">Altitude</h4>
    <label class="flex items-center space-x-2">
      <input
        class="w-3 h-3 checkbox"
        type="checkbox"
        bind:checked={lockToTheEnd} />
      <p class="text-xs">Lock</p>
    </label>
  </div>
  <div bind:this={containerEl} class="overflow-x-scroll scroll-smooth">
    <div
      class="min-h-[300px]"
      style="width: {500 +
        $snapshot.context.sensorData.altitude.time.length * 50}px; ">
      <Line
        bind:chart
        data={{
          labels: [],
          datasets: [
            {
              label: 'Altitude',
              fill: true,
              backgroundColor: 'rgba(54, 162, 235, 0.3)',
              borderColor: 'rgb(75, 75, 192)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(54, 162, 235, 0.3)',
              pointBackgroundColor: 'rgb(255, 255, 255)',
              pointBorderWidth: 10,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgb(255, 255, 255)',
              pointHoverBorderColor: 'rgba(0, 0, 0, 1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [],
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          scales: { x: { beginAtZero: true } },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: false,
            },
          },
        }} />
    </div>
  </div>
</section> -->

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
  // import Button from '@/components/ui/button/button.svelte';

  type Data = { x: string; y: number };

  let x = (d: Data) => new Date(d.x);
  let y = (d: Data) => d.y;

  const template = (d: Data) => [d.x, d.y].join(', ');

  let data: Data[] = [];
  let xValue = 1;

  // function generateDataPoint() {
  //   const y = Math.floor(Math.random() * 100) + 1;
  //   data.push({ x: xValue, y: y });
  //   data = data;

  // }

  $: if ($csvStore.activeStreamObj) {
    const altitude = calculatedAltitude(
      +$csvStore.activeStreamObj.ATMOSPHERIC_PRESSURE,
    );
    const time = $csvStore.activeStreamObj.GPS_TIME;

    data.push({ x: time, y: altitude });
    data = data;
  }
</script>

<div class="h-full">
  <!-- <Button on:click={generateDataPoint}>aAdd</Button> -->
  <VisXYContainer width={600} class="h-full" {data}>
    <VisAxis
      gridLine={false}
      type="x"
      label="X"
      numTicks={6}
      tickFormat={(value) => new Date(value)} />
    <VisLine {x} {y} />
    <VisAxis gridLine={false} type="y" label="Y" />
    <VisCrosshair {template} />
    <VisTooltip />
  </VisXYContainer>
</div>
