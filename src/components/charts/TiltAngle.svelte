<script lang="ts">
  import * as echarts from 'echarts';
  import formatTime from '@/lib/helpers/format-date';
  import { tiltAngleStore } from '@/stores/sensor.data.store';

  export let width: string = '600px';
  export let height: string = '450px';

  $: xAxisData = $tiltAngleStore.history.map(({ time }) => formatTime(time));
  $: seriesDataX = $tiltAngleStore.history.map(({ value }) => value.x);
  $: seriesDataY = $tiltAngleStore.history.map(({ value }) => value.y);
  $: seriesDataZ = $tiltAngleStore.history.map(({ value }) => value.z);

  function chart(node: HTMLDivElement, _: number) {
    const chart = echarts.init(node, null, { renderer: 'canvas' });

    chart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
        },
        formatter: (params: any) => `
          time: ${params[0].name}<br />
          x : ${params[0].value}<br />
          y : ${params[1].value}<br />
          z : ${params[2].value}
        `,
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
        text: 'Tilt Angle',
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'line',
          name: 'TILT_X',
          data: seriesDataX,
        },
        {
          type: 'line',
          name: 'TILT_Y',
          data: seriesDataY,
        },
        {
          type: 'line',
          name: 'ROT_Z',
          data: seriesDataZ,
        },
      ],
    });
    return {
      update(_: number) {
        chart.setOption({
          xAxis: {
            data: xAxisData,
          },
          series: [
            {
              type: 'line',
              name: 'GPS_ALTITUDE',
              data: seriesDataX,
            },
            {
              type: 'line',
              name: 'GPS_LATITUDE',
              data: seriesDataY,
            },
            {
              type: 'line',
              name: 'GPS_LONGITUDE',
              data: seriesDataZ,
            },
          ],
        });
      },
    };
  }
</script>

<div
  use:chart={$tiltAngleStore.history.length}
  style="width: {width}; height: {height};" />
