<script lang="ts">
  import Header from './Header.svelte';
  import Temperature from './graphs/Temperature.svelte';
  import Voltage from './graphs/Voltage.svelte';
</script>

<section class="{$$props.class} flex h-full w-full flex-col">
  <Header />
  <div class="flex flex-1 overflow-x-auto [&>*]:!w-[50%]">
    <Temperature />
    <Voltage />
    <Temperature />
    <Temperature />
    <Temperature />
  </div>
</section>

<style>
</style>
