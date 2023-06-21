<script lang="ts">
  import Header from './Header.svelte';
  import Temperature from './graphs/Temperature.svelte';
</script>

<section class="{$$props.class} h-full w-full">
  <Header />
  <div class="h-[80%] w-auto columns-[600px] overflow-x-auto">
    <Temperature />
    <Temperature />
    <Temperature />
    <Temperature />
    <Temperature />
  </div>
</section>
