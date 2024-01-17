<script lang="ts">
  import RocketIcon from '@/components/icons/RocketIcon.svelte';
  import Header from '../Header.svelte';
  import { afterUpdate } from 'svelte';
  import csvStore from '@/stores/csv.store';
  import { slide } from 'svelte/transition';

  let sectionEl: HTMLElement;
  const { snapshot } = $csvStore;

  afterUpdate(() => {
    scrollToBottom();
  });

  function scrollToBottom() {
    if (sectionEl) {
      sectionEl.scrollTop = sectionEl.scrollHeight;
    }
  }
</script>

<section
  bind:this={sectionEl}
  class="col-span-6 col-start-7 row-start-2 overflow-auto pb-5">
  <Header icon={RocketIcon} title="Streams" />

  <div class="flex flex-col gap-y-4">
    {#each $snapshot.context.streams as stream, index}
      <p transition:slide>
        <span class="text-secondary-500">{index + 1}.</span>
        <span>{stream}</span>
      </p>
    {/each}
  </div>
</section>
