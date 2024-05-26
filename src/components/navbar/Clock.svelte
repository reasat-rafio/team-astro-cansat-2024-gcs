<script lang="ts">
  import { uiStore } from '@/stores/ui.store';
  import { onMount, onDestroy } from 'svelte';

  let startTime = 0;
  let elapsedTime = 0;
  let isRunning = false;

  function updateTime() {
    if (isRunning) {
      elapsedTime = Date.now() - startTime;
    }
  }

  function formatTime(ms: number) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  $: {
    if ($uiStore.clockState === 'start') {
      startStopwatch();
    } else if ($uiStore.clockState === 'paused') {
      pauseStopwatch();
    } else if ($uiStore.clockState === 'reset') {
      resetStopwatch();
    }
  }

  function startStopwatch() {
    if (!isRunning) {
      startTime = Date.now() - elapsedTime;
      isRunning = true;
    }
  }

  function pauseStopwatch() {
    if (isRunning) {
      isRunning = false;
      elapsedTime = Date.now() - startTime;
    }
  }

  function resetStopwatch() {
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
  }

  onMount(() => {
    const interval = setInterval(updateTime, 10);
    return () => clearInterval(interval);
  });

  onDestroy(() => {
    isRunning = false;
  });
</script>

<div class="flex items-center space-x-2 text-lg">
  <span>{formatTime(elapsedTime)}</span>
</div>
