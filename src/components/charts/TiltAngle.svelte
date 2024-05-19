<script lang="ts">
  import * as echarts from 'echarts';
  import { tiltAngleStore } from '@/stores/sensor.data.store';

  export let width: string = '600px';
  export let height: string = '450px';

  $: xAxisData = $tiltAngleStore.history.time;
  $: seriesDataX = $tiltAngleStore.history.value.x;
  $: seriesDataY = $tiltAngleStore.history.value.y;
  $: seriesDataZ = $tiltAngleStore.history.value.z;

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
      legend: {
        data: ['tilt_x', 'tilt_y', 'rot_z'],
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
          name: 'tilt_x',
          data: seriesDataX,
        },
        {
          type: 'line',
          name: 'tilt_y',
          data: seriesDataY,
        },
        {
          type: 'line',
          name: 'rot_z',
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
              name: 'tilt_x',
              data: seriesDataX,
            },
            {
              type: 'line',
              name: 'tilt_y',
              data: seriesDataY,
            },
            {
              type: 'line',
              name: 'rot_z',
              data: seriesDataZ,
            },
          ],
        });
      },
    };
  }
</script>

<div use:chart={xAxisData.length} style="width: {width}; height: {height};" />
