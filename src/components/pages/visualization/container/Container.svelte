<script lang="ts">
  import Header from './Header.svelte';
  import Temperature from './graphs/Temperature.svelte';
  import Voltage from './graphs/Voltage.svelte';
</script>

<section class="{$$props.class} h-full w-full">
  <Header />
  <div class="h-[80%] w-auto columns-[500px] overflow-x-auto">
    <Temperature />
    <Voltage />
    <Temperature />
    <Temperature />
    <Temperature />
  </div>
</section>
