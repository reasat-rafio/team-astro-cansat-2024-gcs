<script lang="ts">
  import * as echarts from 'echarts';
  import formatTime from '@/lib/helpers/format-date';
  import { altitudeStore } from '@/stores/sensor.data.store';

  export let width: string = '600px';
  export let height: string = '450px';

  $: xAxisData = $altitudeStore.history.map(({ time }) => formatTime(time));
  $: seriesData = $altitudeStore.history.map(({ value }) => value);

  function chart(node: HTMLDivElement, _: number) {
    const chart = echarts.init(node, null, { renderer: 'canvas' });

    chart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'line' },
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
      title: { text: 'Altitude' },
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
          series: [{ data: seriesData }],
        });
      },
    };
  }
</script>

<div
  use:chart={$altitudeStore.history.length}
  style="width: {width}; height: {height};" />
