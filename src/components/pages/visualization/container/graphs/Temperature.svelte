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

  let labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  let data = [65, 59, 80, 81, 56, 55, 40];

  let chart: ChartJS<'line', (number | Point)[], unknown> | undefined;

  onMount(() => {
    if (chart)
      setInterval(() => {
        chart?.data.datasets[0].data.push(Math.random() * 100);
        chart?.data.labels?.push('asd');
        chart?.update();
      }, 1000);
  });
</script>

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
