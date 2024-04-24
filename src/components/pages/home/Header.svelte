<script lang="ts">
  import H3 from '@/components/ui/H3.svelte';
  import { cn } from '@/utils';
  import type { FlaskConical } from 'lucide-svelte';

  export let icon: typeof FlaskConical;
  export let title: string;
</script>

<header
  class={cn(
    'sticky top-0 z-10 flex items-center space-x-3 border-b  bg-background pb-3',
    $$props.class,
  )}>
  <svelte:component this={icon} size={20} />
  <H3 class="underline">{title}</H3>
</header>
