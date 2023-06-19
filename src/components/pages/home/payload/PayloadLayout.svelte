<script lang="ts">
  import { AppShell } from "@skeletonlabs/skeleton";
</script>

<AppShell>
  <svelte:fragment slot="pageHeader">
    <h3 class="h3">Payload</h3>
  </svelte:fragment>
  <slot />
</AppShell>
