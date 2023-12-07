<script lang="ts">
  import DocumentChartBarIcon from '@/components/icons/DocumentChartBarIcon.svelte';
  import Header from '../Header.svelte';
  import { SlideToggle } from '@skeletonlabs/skeleton';

  let sensor_reading = true;
  let interchanged = true;
  let gps = true;
  let accelerometer = true;
  let data_source = true;
  let battery_voltage = true;
  let temperature = false;
  let pressure = false;
  let x = true;
  let y = true;
</script>

<section class="overflow-auto col-span-3 row-start-1 col-start-1">
  <Header icon={DocumentChartBarIcon} title="Data Groups" />

  <div class="flex flex-col gap-y-4">
    <SlideToggle
      bind:checked={sensor_reading}
      background="bg-primary-500"
      active="bg-secondary-500"
      name="slider-label"
      size="sm">Sensor Reading</SlideToggle
    >
    <SlideToggle
      bind:checked={interchanged}
      background="bg-primary-500"
      active="bg-secondary-500"
      name="slider-label"
      size="sm">Interchanged</SlideToggle
    >
    <SlideToggle
      bind:checked={gps}
      background="bg-primary-500"
      active="bg-secondary-500"
      name="slider-label"
      size="sm">GPS</SlideToggle
    >
    <SlideToggle
      bind:checked={accelerometer}
      background="bg-primary-500"
      active="bg-secondary-500"
      name="slider-label"
      size="sm">Accelerometer</SlideToggle
    >
    <SlideToggle
      bind:checked={data_source}
      background="bg-primary-500"
      active="bg-secondary-500"
      name="slider-label"
      size="sm">Data Source</SlideToggle
    >
    <SlideToggle
      bind:checked={battery_voltage}
      background="bg-primary-500"
      active="bg-secondary-500"
      name="slider-label"
      size="sm">Battery Voltage</SlideToggle
    >
    <SlideToggle
      bind:checked={temperature}
      background="bg-primary-500"
      active="bg-secondary-500"
      name="slider-label"
      size="sm">Temperature</SlideToggle
    >
    <SlideToggle
      bind:checked={pressure}
      background="bg-primary-500"
      active="bg-secondary-500"
      name="slider-label"
      size="sm">Pressure</SlideToggle
    >
    <SlideToggle
      bind:checked={x}
      background="bg-primary-500"
      active="bg-secondary-500"
      name="slider-label"
      size="sm">X</SlideToggle
    >
    <SlideToggle
      bind:checked={y}
      background="bg-primary-500"
      active="bg-secondary-500"
      name="slider-label"
      size="sm">Y</SlideToggle
    >
  </div>
</section>
