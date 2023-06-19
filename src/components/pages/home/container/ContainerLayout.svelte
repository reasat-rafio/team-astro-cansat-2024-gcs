<script lang="ts">
  import { AppShell } from "@skeletonlabs/skeleton";
</script>

<AppShell>
  <svelte:fragment slot="pageHeader">
    <h3 class="h3">Container</h3>
  </svelte:fragment>
  <slot />
</AppShell>
