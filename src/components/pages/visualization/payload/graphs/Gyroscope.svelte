<script lang="ts">
  import { Line } from 'svelte-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  } from 'chart.js';
  import { onMount } from 'svelte';
  import type { Point } from 'chart.js/dist/core/core.controller';
  import gyroscopeStore from '@stores/payload/gyroscope';
  import { delay } from '$lib/helper';

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );

  let chart: ChartJS<'line', (number | Point)[], unknown> | undefined;
  let containerEl: HTMLDivElement;
  let lockToTheEnd = true;

  onMount(() => {
    if (chart) {
      $gyroscopeStore.value.forEach(({ x, y, z }) => {
        chart?.data.datasets[0].data.push(x);
        chart?.data.datasets[1].data.push(y);
        chart?.data.datasets[2].data.push(z);
      });
      $gyroscopeStore.time.forEach((d) => chart?.data.labels!!.push(d));
      chart.update();
    }
  });

  async function updateGraph() {
    if (chart) {
      chart.data.datasets[0].data.push(
        $gyroscopeStore.value[$gyroscopeStore.value.length - 1].x
      );
      chart.data.datasets[1].data.push(
        $gyroscopeStore.value[$gyroscopeStore.value.length - 1].y
      );
      chart.data.datasets[2].data.push(
        $gyroscopeStore.value[$gyroscopeStore.value.length - 1].z
      );
      chart.data.labels?.push(
        $gyroscopeStore.time[$gyroscopeStore.time.length - 1]
      );

      await delay(10);
      autoScrollAction();
      chart.update();
    }
  }

  function autoScrollAction() {
    if (containerEl && lockToTheEnd) {
      containerEl.scrollLeft = containerEl.scrollWidth;
    }
  }

  $: $gyroscopeStore, updateGraph();
</script>

<section>
  <div class="flex">
    <h4 class="h6 ml-5 flex-1 text-tertiary-500">Gyroscope</h4>
    <label class="flex items-center space-x-2">
      <input
        class="checkbox h-3 w-3"
        type="checkbox"
        bind:checked={lockToTheEnd}
      />
      <p class="text-xs">Lock</p>
    </label>
  </div>
  <div bind:this={containerEl} class="overflow-x-scroll scroll-smooth">
    <div
      class="h-[300px]"
      style="width: {500 + $gyroscopeStore.value.length * 50}px; "
    >
      <Line
        bind:chart
        data={{
          labels: [],
          datasets: [
            {
              label: 'X',
              fill: true,
              backgroundColor: 'rgba(54, 162, 235, 0.3)',
              borderColor: 'rgb(100, 192, 192)',
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
              data: []
            },
            {
              label: 'Y',
              fill: true,
              backgroundColor: 'rgba(54, 162, 235, 0.3)',
              borderColor: 'rgb(192, 75, 75)',
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
              data: []
            },
            {
              label: 'Z',
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
              data: []
            }
          ]
        }}
        options={{
          maintainAspectRatio: false,
          scales: { x: { beginAtZero: true } },
          plugins: {
            legend: {
              display: true,
              position: 'right'
            },
            title: {
              display: false
            }
          }
        }}
      />
    </div>
  </div>
</section>
