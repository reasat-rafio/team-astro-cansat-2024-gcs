<script lang="ts">
  import FireIcon from '@/components/icons/FireIcon.svelte';
  import { slide } from 'svelte/transition';
  import { gsap } from 'gsap';
  type Tree = {
    label: string;
    children?: Tree[];
  };

  export let tree: Tree;
  const { label, children } = tree;

  let expanded = true;
  let path1: SVGPathElement;
  let path2: SVGPathElement;

  const toggleExpansion = () => {
    expanded = !expanded;
  };

  $: if (path1 && path2) {
    if (expanded) {
      gsap.to(path1, {
        attr: { d: 'M 12 3 L 3 11', stroke: 'rgb(70 133 175)' }
      });
      gsap.to(path2, {
        attr: { d: 'M 3 3 L 12 11', stroke: 'rgb(70 133 175)' }
      });
    } else {
      gsap.to(path1, {
        attr: { d: 'M 8 2 L 8 14', stroke: 'hsl(0, 0%, 100%)' }
      });
      gsap.to(path2, {
        attr: { d: 'M 2 8 L 14 8', stroke: 'hsl(0, 0%, 100%)' }
      });
    }
  }
</script>

<li class="pl-[1em]">
  {#if children}
    <button
      class="hover:bg-surface-500 rounded-lg transition-colors duration-300 flex gap-x-2 py-2 px-5 text-left"
      on:click={toggleExpansion}
    >
      <span class="cursor-pointer flex items-center gap-x-1">
        <svg width="14" height="14" viewBox="0 0 16 16">
          <path
            bind:this={path1}
            fill="transparent"
            stroke-width="3"
            stroke-linecap="round"
          />
          <path
            bind:this={path2}
            fill="transparent"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
        <FireIcon />
      </span>
      {label}
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
      class="flex gap-x-2 py-2 px-5 hover:bg-surface-500 rounded-lg transition-colors duration-300 text-left"
    >
      <FireIcon />
      {label}
    </button>
  {/if}
</li>
