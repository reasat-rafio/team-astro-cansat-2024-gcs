<script lang="ts">
  import * as echarts from 'echarts';
  import formatTime from '@/lib/helpers/format-date';
  import {
    altitudeStore,
    type SensorDataStore,
  } from '@/stores/sensor.data.store';

  export let width: string = '600px';
  export let height: string = '450px';

  function chart(node: HTMLDivElement, props: SensorDataStore['history']) {
    const chart = echarts.init(node);

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
        data: props?.map(({ time }) => formatTime(time)),
      },
      yAxis: { type: 'value' },
      series: [{ type: 'line', data: props?.map(({ value }) => value) }],
    });
    return {
      update(props: SensorDataStore['history']) {
        chart.setOption({
          xAxis: {
            data: props?.map(({ time }) => formatTime(time)),
          },
          series: [{ data: props?.map(({ value }) => value) }],
        });
      },
    };
  }
</script>

<div
  use:chart={$altitudeStore.history}
  style="width: {width}; height: {height};" />
