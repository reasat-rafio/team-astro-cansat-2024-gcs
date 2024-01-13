<script lang="ts">
  import RocketIcon from '@/components/icons/RocketIcon.svelte';
  import Header from '../Header.svelte';
  import { afterUpdate, onMount, tick } from 'svelte';
  import csvStore from '@/stores/csv.store';
  import { slide } from 'svelte/transition';

  let data: string[] = [];
  let sectionEl: HTMLElement;

  onMount(() => {
    const subscriber = $csvStore.actorRef.subscribe((state) => {
      if (state.context.streams) {
        data = state.context.streams;
      }
    });

    return () => subscriber.unsubscribe();
  });

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
    {#each data as d, index}
      <p transition:slide>
        <span class="text-secondary-500">{index + 1}.</span>
        <span>{d}</span>
      </p>
    {/each}
  </div>
</section>
