<script lang="ts">
  import SectionHeader from '../SectionHeader.svelte';
  import Temperature from './graphs/Temperature.svelte';
</script>

<section
  class="{$$props.class} flex h-full w-full flex-col space-y-6 overflow-x-scroll"
>
  <SectionHeader title="Container" />
  <div class="grid h-full grid-cols-3 gap-[50px] overflow-x-scroll">
    <Temperature />
    <!-- <Temperature />
    <Temperature />
    <Temperature />
    <Temperature /> -->
  </div>
</section>
