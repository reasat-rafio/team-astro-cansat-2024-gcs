<script lang="ts">
  import * as echarts from 'echarts';
  import { gpsCoordinatesStore } from '@/stores/sensor.data.store';

  export let width: string = '600px';
  export let height: string = '450px';

  $: xAxisData = $gpsCoordinatesStore.history.time;
  $: seriesDataX = $gpsCoordinatesStore.history.value.x;
  $: seriesDataY = $gpsCoordinatesStore.history.value.y;
  $: seriesDataZ = $gpsCoordinatesStore.history.value.z;

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
          altitude : ${params[0].value}<br />
          latitude : ${params[1].value}<br />
          longitude : ${params[2].value}
        `,
      },
      legend: {
        data: ['altitude', 'latitude', 'longitude'],
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
        text: 'GPS Coordinates',
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
          name: 'altitude',
          data: seriesDataX,
        },
        {
          type: 'line',
          name: 'latitude',
          data: seriesDataY,
        },
        {
          type: 'line',
          name: 'longitude',
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
              name: 'altitude',
              data: seriesDataX,
            },
            {
              type: 'line',
              name: 'latitude',
              data: seriesDataY,
            },
            {
              type: 'line',
              name: 'longitude',
              data: seriesDataZ,
            },
          ],
        });
      },
    };
  }
</script>

<div use:chart={xAxisData.length} style="width: {width}; height: {height};" />
