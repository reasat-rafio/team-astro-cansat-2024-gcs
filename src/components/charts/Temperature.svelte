<script lang="ts">
  import * as echarts from 'echarts';
  import { temperatureStore } from '@/stores/sensor.data.store';

  export let width: string = '600px';
  export let height: string = '450px';

  $: xAxisData = $temperatureStore.history.time;
  $: seriesData = $temperatureStore.history.value;

  function chart(node: HTMLDivElement, _: number) {
    const chart = echarts.init(node, null, { renderer: 'canvas' });
    chart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
        },
        formatter: (params: any) =>
          `time: ${params[0].name} : value: ${params[0].value} °C`,
      },

      dataZoom: [
        {
          type: 'inside',
          start: 70,
          end: 100,
        },
        {
          start: 70,
          end: 100,
        },
      ],
      title: {
        text: 'Temperature',
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
      },
      yAxis: { type: 'value' },
      series: [{ type: 'line', data: seriesData }],
    });
    return {
      update(_: number) {
        chart.setOption({
          xAxis: {
            data: xAxisData,
          },
          series: [
            {
              data: seriesData,
            },
          ],
        });
      },
    };
  }
</script>

<div use:chart={xAxisData.length} style="width: {width}; height: {height};" />
