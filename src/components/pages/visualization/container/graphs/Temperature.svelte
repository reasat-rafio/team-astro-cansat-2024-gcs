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
  import ZoomPlugin from 'chartjs-plugin-zoom';
  import { temperature } from '@stores/data.store';

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    ZoomPlugin
  );

  let chart: ChartJS<'line', (number | Point)[], unknown> | undefined;

  // $: {
  //   console.log('====================================');
  //   console.log($temperature);
  //   console.log('====================================');
  // }

  function updateGraph() {
    if (chart) {
      chart.data.datasets[0].data.push(
        $temperature.temperature[$temperature.temperature.length - 1]
      );
      chart.data.labels?.push($temperature.time[$temperature.time.length - 1]);
      chart.update();
    }
  }

  $: $temperature, updateGraph();
</script>

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
    plugins: {
      zoom: {
        limits: {
          x: { min: 0.5, max: 2e3, minRange: 100 },
          y: { min: 0, max: 200, minRange: 10 }
        },
        pan: {
          enabled: true,
          mode: 'xy',
          threshold: 5
        },
        zoom: {
          wheel: {
            enabled: true
          },
          pinch: {
            enabled: true
          },
          mode: 'xy'
        }
      },
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Temperature'
      }
    }
  }}
/>
