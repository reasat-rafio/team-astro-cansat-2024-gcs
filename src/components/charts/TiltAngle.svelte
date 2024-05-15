<script lang="ts">
  import * as echarts from 'echarts';
  import formatTime from '@/lib/helpers/format-date';
  import {
    tiltAngleStore,
    type SensorData2Store,
  } from '@/stores/sensor.data.store';

  export let width: string = '600px';
  export let height: string = '450px';

  function chart(node: HTMLDivElement, props: SensorData2Store['history']) {
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
        data: props?.map(({ time }) => formatTime(time)),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'line',
          name: 'TILT_X',
          data: props?.map(({ value }) => value.x),
        },
        {
          type: 'line',
          name: 'TILT_Y',
          data: props?.map(({ value }) => value.y),
        },
        {
          type: 'line',
          name: 'ROT_Z',
          data: props?.map(({ value }) => value.z),
        },
      ],
    });
    return {
      update(props: SensorData2Store['history']) {
        chart.setOption({
          xAxis: {
            data: props?.map(({ time }) => formatTime(time)),
          },
          series: [
            {
              type: 'line',
              name: 'GPS_ALTITUDE',
              data: props?.map(({ value }) => value.x),
            },
            {
              type: 'line',
              name: 'GPS_LATITUDE',
              data: props?.map(({ value }) => value.y),
            },
            {
              type: 'line',
              name: 'GPS_LONGITUDE',
              data: props?.map(({ value }) => value.z),
            },
          ],
        });
      },
    };
  }
</script>

<div
  use:chart={$tiltAngleStore.history}
  style="width: {width}; height: {height};" />
