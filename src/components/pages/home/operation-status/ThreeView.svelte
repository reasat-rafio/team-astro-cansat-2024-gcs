<script lang="ts">
  import { slide } from 'svelte/transition';
  import { gsap } from 'gsap';
  import type { SystemStatus } from '@/lib/@types/app.types';
  import { Check, CircleDashed, CircleSlash, Flame } from 'lucide-svelte';
  import { cn } from '@/utils';

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
        attr: { d: 'M 12 3 L 3 11', stroke: '#6a48f2' },
      });
      gsap.to(path2, {
        attr: { d: 'M 3 3 L 12 11', stroke: '#6a48f2' },
      });
    } else {
      gsap.to(path1, {
        attr: { d: 'M 8 2 L 8 14', stroke: '#6a48f2' },
      });
      gsap.to(path2, {
        attr: { d: 'M 2 8 L 14 8', stroke: '#6a48f2' },
      });
    }
  }
</script>

<li>
  {#if children}
    <button
      class={cn(
        'group flex gap-x-2 rounded-lg px-5 py-2 pl-[1em] text-left transition-colors duration-300 hover:bg-[#6a48f2]',
        expanded ? '' : '',
      )}
      on:click={toggleExpansion}>
      <span class="flex cursor-pointer items-center gap-x-1">
        <svg width="14" height="14" viewBox="0 0 16 16">
          <path
            class="group-hover:stroke-white"
            bind:this={path1}
            fill="transparent"
            stroke-width="3"
            stroke-linecap="round" />
          <path
            class="group-hover:stroke-white"
            bind:this={path2}
            fill="transparent"
            stroke-width="3"
            stroke-linecap="round" />
        </svg>
        <Flame size={18} />
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
      class="flex gap-x-2 rounded-lg px-5 py-2 text-left transition-colors duration-300 hover:bg-[#6a48f2]">
      {#if label.state === 'done'}
        <Check color="green" size={18} />
      {:else if label.state === 'inProgress'}
        <CircleDashed color="yellow" size={18} class="animate-spin" />
      {:else if label.state === 'notStarted'}
        <Flame size={18} />
      {:else if label.state === 'error'}
        <CircleSlash size={18} color="red" />
      {/if}

      {label.text}
    </button>
  {/if}
</li>
