<script lang="ts">
  import Container from '@components/pages/home/container/Container.svelte';
  import Payload from '@components/pages/home/payload/Payload.svelte';
  import { navbarHeight } from '@stores/ui.store.';
</script>

<section
  style="height: calc(100vh - {$navbarHeight}px);"
  class="grid grid-cols-2 space-x-5 px-5 pt-3"
>
  <Container />
  <Payload />
</section>
