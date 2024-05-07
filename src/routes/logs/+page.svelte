<script lang="ts">
  import formatDate from '@/lib/helpers/format-date';
  import logStore from '@/stores/log.store';
  import { slide } from 'svelte/transition';

  let sectionEl: HTMLElement;

  $: if ($logStore?.length && sectionEl) {
    sectionEl.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
</script>

<section
  bind:this={sectionEl}
  class="min-h-screen w-full rounded-lg border p-4">
  {#if !!$logStore?.length}
    <div class="flex w-full flex-col gap-y-2">
      {#each $logStore as { value, time }, index}
        <div class="flex gap-5" transition:slide>
          <div class="flex-1">
            <span class="text-primary">{index + 1}.</span>
            <span>{value}</span>
          </div>

          <div class="w-fit text-sm text-primary">
            {formatDate(time)}
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <p class="text-destructive">No logs available</p>
  {/if}
</section>
