<script lang="ts">
  import VisualIcon from '@/components/icons/VisualIcon.svelte';
  import Header from '../Header.svelte';
  import {
    VisXYContainer,
    VisLine,
    VisAxis,
    VisCrosshair,
  } from '@unovis/svelte';
  import { onMount } from 'svelte';
  import Button from '@/components/ui/button/button.svelte';
  // import Altitude from '../../visualization/charts/Altitude.svelte';
  // import AirPressure from '../../visualization/charts/AirPressure.svelte';
  // import Temperature from '../../visualization/charts/Temperature.svelte';
  // import AirSpeed from '../../visualization/charts/AirSpeed.svelte';
  // import BatteryVoltage from '../../visualization/charts/BatteryVoltage.svelte';
  // import GpsCoordinates from '../../visualization/charts/GpsCoordinates.svelte';
  // import TiltAngle from '../../visualization/charts/TiltAngle.svelte';

  type Data = { x: number; y: number };

  const numberOfPoints = 10;
  let data = [] as Data[];
  let xValue = 1;

  function generateDataPoint() {
    const y = Math.floor(Math.random() * 100) + 1;
    data = [...data, { x: xValue, y: y }];

    xValue++;
  }

  let x = (d: Data) => d.x;
  let y = (d: Data) => d.y;

  // const triggers = {
  //   [StackedBar.selectors.bar]: (d: DataRecord) => `<span>x :  ${d.x}<br / >y :  ${d.y}< / span>`
  // }

  let intervalId: number;
  // onMount(() => {
  //   if (xValue < numberOfPoints) setInterval(generateDataPoint, 1000);

  //   return () => clearInterval(intervalId);
  // });
</script>

<section class="overflow-auto">
  <Header icon={VisualIcon} title="Charts" />

  <Button on:click={generateDataPoint}>Add</Button>

  <!-- <Button on:click={generateDataPoint}>Add</Button> -->
  <div class="overflow-auto">
    <!-- <Altitude />
    <AirPressure />
    <Temperature />
    <AirSpeed />
    <BatteryVoltage />
    <GpsCoordinates />
    <TiltAngle /> -->
    <div class="">
      <VisXYContainer class="w-full !overscroll-auto" {data}>
        <VisLine {x} {y} />
        <VisAxis type="x" />
        <VisAxis type="y" />
        <VisCrosshair />
      </VisXYContainer>
    </div>
  </div>
</section>
