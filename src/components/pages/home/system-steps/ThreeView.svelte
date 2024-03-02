<script lang="ts">
  import FireIcon from '@/components/icons/FireIcon.svelte';
  import { slide } from 'svelte/transition';
  import { gsap } from 'gsap';
  import type { SystemStatus } from '@/lib/@types/app.types';
  import TickIcon from '@/components/icons/TickIcon.svelte';
  import OnProgress from '@/components/OnProgress.svelte';

  type Tree = {
    label: { text: string; state: SystemStatus };
    children?: Tree[];
  };

  export let tree: Tree;
  $: ({ label, children } = tree);

  let expanded = true;
  let path1: SVGPathElement;
  let path2: SVGPathElement;

  const toggleExpansion = () => {
    expanded = !expanded;
  };

  $: if (path1 && path2) {
    if (expanded) {
      gsap.to(path1, {
        attr: { d: 'M 12 3 L 3 11', stroke: 'rgb(70 133 175)' },
      });
      gsap.to(path2, {
        attr: { d: 'M 3 3 L 12 11', stroke: 'rgb(70 133 175)' },
      });
    } else {
      gsap.to(path1, {
        attr: { d: 'M 8 2 L 8 14', stroke: 'hsl(0, 0%, 100%)' },
      });
      gsap.to(path2, {
        attr: { d: 'M 2 8 L 14 8', stroke: 'hsl(0, 0%, 100%)' },
      });
    }
  }
</script>

<li>
  {#if children}
    <button
      class="hover:bg-surface-500 flex gap-x-2 rounded-lg px-5 py-2 pl-[1em] text-left transition-colors duration-300"
      on:click={toggleExpansion}>
      <span class="flex cursor-pointer items-center gap-x-1">
        <svg width="14" height="14" viewBox="0 0 16 16">
          <path
            bind:this={path1}
            fill="transparent"
            stroke-width="3"
            stroke-linecap="round" />
          <path
            bind:this={path2}
            fill="transparent"
            stroke-width="3"
            stroke-linecap="round" />
        </svg>
        <FireIcon />
      </span>
      {label.text}
    </button>
    {#if expanded}
      <div transition:slide>
        {#each children as child}
          <div class="pl-[1em]" transition:slide>
            <svelte:self tree={child} />
          </div>
        {/each}
      </div>
    {/if}
  {:else}
    <button
      class="hover:bg-surface-500 flex gap-x-2 rounded-lg px-5 py-2 text-left transition-colors duration-300">
      {#if label.state === 'done'}
        <TickIcon />
      {:else if label.state === 'inProgress'}
        <OnProgress />
      {:else if label.state === 'notStarted'}
        <FireIcon />
      {/if}

      {label.text}
    </button>
  {/if}
</li>
