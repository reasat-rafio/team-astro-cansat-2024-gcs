<script lang="ts">
  import * as Sheet from '@/components/ui/sheet/index.js';
  import Button from '../ui/button/button.svelte';
  import { MenuIcon, Trash2Icon } from 'lucide-svelte';
  import Switch from '../ui/switch/switch.svelte';
  import { Label } from '../ui/label';
  import { uiStore } from '@/stores/ui.store';
  import { addLog, clearLogs } from '@/stores/log.store';

  function updateNotification(isChecked: boolean) {
    if (isChecked) {
      addLog({
        time: new Date(),
        value: 'Notification is enabled',
        state: 'success',
      });
    } else {
      addLog({
        time: new Date(),
        value: 'Notification is disabled',
        state: 'success',
      });
    }
  }

  function updateLogLock(isChecked: boolean) {
    if (isChecked) {
      addLog({
        time: new Date(),
        value: 'Log is locked',
        state: 'success',
      });
    } else {
      addLog({
        time: new Date(),
        value: 'Log is unlocked',
        state: 'success',
      });
    }
  }
</script>

<Sheet.Root>
  <Sheet.Trigger asChild let:builder>
    <Button builders={[builder]} variant="outline">
      <MenuIcon size={18} />
    </Button>
  </Sheet.Trigger>
  <Sheet.Content side="right">
    <Sheet.Header>
      <Sheet.Title>
        <!--  -->
      </Sheet.Title>
      <Sheet.Description>
        <!-- Make changes to your profile here. Click save when you're done. -->
      </Sheet.Description>
    </Sheet.Header>
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <div class="grid grid-cols-4 items-center gap-4"></div>
      </div>
      <Sheet.Footer>
        <div class="flex w-full flex-col gap-2">
          <div class="flex w-full items-center space-x-2">
            <Switch
              onCheckedChange={updateNotification}
              bind:checked={$uiStore.showNotification}
              id="show-notification" />
            <Label for="show-notification">Show Notification</Label>
          </div>

          <div class="flex w-full items-center space-x-2">
            <Switch
              onCheckedChange={updateLogLock}
              bind:checked={$uiStore.lockLog}
              id="show-log-lock" />
            <Label for="show-log-lock">Lock Log</Label>
          </div>

          <Button
            on:click={clearLogs}
            variant="outline"
            class="w-full space-x-2">
            <span>Clear Logs</span>
            <Trash2Icon size={18} />
          </Button>
        </div>
      </Sheet.Footer>
    </div>
  </Sheet.Content>
</Sheet.Root>
