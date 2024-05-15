<script lang="ts">
  import * as echarts from 'echarts';
  import formatTime from '@/lib/helpers/format-date';
  import { temperatureStore } from '@/stores/sensor.data.store';

  export let width: string = '600px';
  export let height: string = '450px';

  $: xAxisData = $temperatureStore.history.map(({ time }) => formatTime(time));
  $: seriesData = $temperatureStore.history.map(({ value }) => value);

  function chart(node: HTMLDivElement, _: number) {
    const chart = echarts.init(node, null, { renderer: 'canvas' });
    chart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
        },
        formatter: (params: any) => `${params[0].name} : ${params[0].value}`,
      },

      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      title: {
        text: 'Temperature',
      },
      xAxis: {
        type: 'category',
        data: seriesData,
      },
      yAxis: { type: 'value' },
      series: [{ type: 'line', data: xAxisData }],
    });
    return {
      update(_: number) {
        chart.setOption({
          xAxis: {
            data: seriesData,
          },
          series: [
            {
              data: xAxisData,
            },
          ],
        });
      },
    };
  }
</script>

<div
  use:chart={$temperatureStore.history.length}
  style="width: {width}; height: {height};" />
