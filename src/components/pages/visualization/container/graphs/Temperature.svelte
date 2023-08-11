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
    CategoryScale,
    scales
  } from 'chart.js';
  import { onMount } from 'svelte';
  import type { Point } from 'chart.js/dist/core/core.controller';
  import temperatureStore from '@stores/temperature';
  import { navbarHeight } from '@stores/ui.store.';

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

  onMount(() => {
    if (chart) {
      $temperatureStore.value.forEach((d) =>
        chart?.data.datasets[0].data.push(d)
      );
      $temperatureStore.time.forEach((d) => chart?.data.labels!!.push(d));
      chart.update();
    }
  });

  function updateGraph() {
    if (chart) {
      chart.data.datasets[0].data.push(
        $temperatureStore.value[$temperatureStore.value.length - 1]
      );
      chart.data.labels?.push(
        $temperatureStore.time[$temperatureStore.time.length - 1]
      );
      // if (containerEl) containerEl.scrollLeft = containerEl.scrollWidth;
      chart.update();
    }
  }

  $: $temperatureStore, updateGraph();
</script>

<section>
  <h4 class="h6 ml-5 text-secondary-400">Temperature</h4>
  <div bind:this={containerEl} class="overflow-x-scroll">
    <div
      class="h-[300px]"
      style="width: {500 + $temperatureStore.value.length * 50}px; "
    >
      <Line
        bind:chart
        data={{
          labels: [],
          datasets: [
            {
              label: 'Temperature',
              fill: true,
              backgroundColor: 'rgba(54, 162, 235, 0.3)',
              borderColor: 'rgb(75, 192, 192)',
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
          responsive: true,
          maintainAspectRatio: false,
          scales: { x: { beginAtZero: true } },
          plugins: {
            legend: {
              display: false
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
