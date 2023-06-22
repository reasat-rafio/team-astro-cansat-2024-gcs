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
  import { voltage } from '@stores/data.store';

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

  // onMount(() => {
  //   if (chart) {
  //     $voltage.value.forEach((d) => chart?.data.datasets[0].data.push(d));
  //     $voltage.time.forEach((d) => chart?.data.labels!!.push(d));
  //     chart.update();
  //   }
  // });

  // function updateGraph() {
  //   if (chart) {
  //     chart.data.datasets[0].data.push(
  //       $voltage.value[$voltage.value.length - 1]
  //     );
  //     chart.data.labels?.push($voltage.time[$voltage.time.length - 1]);
  //     chart.update();
  //   }
  // }

  // $: $voltage, updateGraph();
</script>

<Bar
  bind:chart
  data={{
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        label: '% of Voltage',
        data: [33, 12, 77, 55, 13, 51],
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
