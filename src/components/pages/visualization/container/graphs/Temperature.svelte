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
  import zoomPlugin from 'chartjs-plugin-zoom';

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    zoomPlugin
  );

  let labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  let data = [65, 59, 80, 81, 56, 55, 40];
  let delayed: boolean;

  let chart: ChartJS<'line', (number | Point)[], unknown> | undefined;

  onMount(() => {
    if (chart)
      setInterval(() => {
        chart!!.data.datasets[0].data = [
          ...chart!!.data.datasets[0].data,
          Math.random() * 100
        ];
        chart!!.data.labels = [...chart!!.data.labels, 'asd'];
      }, 1000);
  });
</script>

<div class="flex h-full items-end justify-end">
  <Line
    bind:chart
    data={{
      labels,
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
          data
        }
      ]
    }}
    options={{
      //   animation: {
      //     onComplete: () => {
      //       delayed = true;
      //     },
      //     delay: (context) => {
      //       let delay = 0;
      //       if (
      //         context.type === 'data' &&
      //         context.mode === 'default' &&
      //         !delayed
      //       ) {
      //         delay = context.dataIndex * 150 + context.datasetIndex * 40;
      //       }
      //       return delay;
      //     }
      //   },
      responsive: true,
      plugins: {
        // zoom: {
        //   pan: {
        //     enabled: true,
        //     mode: 'xy',
        //     threshold: 5
        //   },
        //   zoom: {
        //     wheel: {
        //       enabled: true
        //     },
        //     pinch: {
        //       enabled: true
        //     },
        //     mode: 'xy'
        //   }
        // },
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart'
        }
      }
    }}
  />
</div>
