<script lang="ts">
  import Header from './payload/Header.svelte';
  import Temperature from './payload/graphs/Temperature.svelte';
  import Voltage from './payload/graphs/Voltage.svelte';
</script>

<section class="{$$props.class} flex h-full w-full flex-col">
  <Header />

  <div class="flex flex-1 overflow-x-auto [&>*]:!w-[50%]">
    <Voltage />
    <Temperature />
  </div>
</section>
