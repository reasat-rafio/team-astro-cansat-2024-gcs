<script lang="ts">
  import { Bar } from 'svelte-chartjs';
  import ZoomPlugin from 'chartjs-plugin-zoom';

  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  } from 'chart.js';
  import { onMount } from 'svelte';

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ZoomPlugin,
    BarElement,
    CategoryScale,
    LinearScale
  );

  let chart: ChartJS<'bar', (number | [number, number])[], unknown> | undefined;

  onMount(() => {
    if (chart)
      setInterval(() => {
        chart?.data.datasets[0].data.push(Math.random() * 50);
        chart?.data.labels?.push('asd');
        chart?.update();
      }, 1000);
  });
</script>

<Bar
  bind:chart
  data={{
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '% of Voltage',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: ['rgba(255, 134,159,0.4)'],
        borderWidth: 2,
        borderColor: ['rgba(255, 134, 159, 1)']
      }
    ]
  }}
  options={{
    responsive: true,
    plugins: {
      zoom: {
        limits: {
          x: { min: 0.5, max: 2e3, minRange: 100 },
          y: { min: 0, max: 100, minRange: 10 }
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
        text: 'Voltage'
      }
    }
  }}
/>
