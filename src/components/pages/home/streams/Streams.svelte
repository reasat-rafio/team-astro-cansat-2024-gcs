<script lang="ts">
  import RocketIcon from '@/components/icons/RocketIcon.svelte';
  import Header from '../Header.svelte';
  import { afterUpdate } from 'svelte';
  import csvStore from '@/stores/csv.temp.store';
  import { slide } from 'svelte/transition';
  // import gcsStore from '@/stores/gcs.store';

  let sectionEl: HTMLElement;
  // const { snapshot: csvSnapshot } = $csvStore;
  // const { snapshot: gcsSnapshot } = $gcsStore;

  $: {
    console.log($csvStore);
  }

  afterUpdate(() => {
    scrollToBottom();
  });

  function scrollToBottom() {
    if (sectionEl) {
      sectionEl.scrollTop = sectionEl.scrollHeight;
    }
  }
</script>

<section bind:this={sectionEl} class="w-full overflow-auto pb-5 scrollbar-thin">
  <Header icon={RocketIcon} title="Streams" />

  <div class="flex w-full flex-col gap-y-4">
    {#each $csvStore.streams as stream, index}
      <p transition:slide>
        <span class="text-secondary-500">{index + 1}.</span>
        <span>{stream}</span>
      </p>
    {/each}
  </div>
</section>
