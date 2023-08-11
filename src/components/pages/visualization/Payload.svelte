<script lang="ts">
  import Temperature from './container/graphs/Temperature.svelte';
  import SectionHeader from './SectionHeader.svelte';
</script>

<section
  class="{$$props.class} flex h-full w-full flex-col space-y-6 overflow-x-scroll"
>
  <SectionHeader title="Payload" color="secondary" />

  <div class="grid h-full grid-cols-3 gap-[50px] overflow-x-scroll">
    <Temperature />
    <!-- <Temperature />
    <Temperature />
    <Temperature />
    <Temperature /> -->
  </div>
</section>
