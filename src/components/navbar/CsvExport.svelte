<script lang="ts">
  import Papa from 'papaparse';
  import Button from '../ui/button/button.svelte';
  import { Download } from 'lucide-svelte';
  import rowTelemetryStore from '@/stores/row-telemetry';
  import { addLog } from '@/stores/log.store';

  const header = [
    'TEAM_ID',
    'MISSION_TIME',
    'PACKET_COUNT',
    'MODE',
    'STATE',
    'ALTITUDE',
    'AIR_SPEED',
    'HS_DEPLOYED',
    'PC_DEPLOYED',
    'TEMPERATURE',
    'VOLTAGE',
    'PRESSURE',
    'GPS_TIME',
    'GPS_ALTITUDE',
    'GPS_LATITUDE',
    'GPS_LONGITUDE',
    'GPS_SATS',
    'TILT_X',
    'TILT_Y',
    'ROT_Z',
    'LAST_CMD',
  ];

  function handleCSVExport(fileName: string) {
    const csv = Papa.unparse([
      header,
      ...$rowTelemetryStore.map((telData) => telData.split(', ')),
    ]);
    console.log({ csv });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();

    addLog({
      value: 'CSV Exported',
      state: 'success',
      time: new Date(),
    });
  }
</script>

<Button
  on:click={() => handleCSVExport('Flight_2024.csv')}
  class="flex gap-2"
  variant="outline">
  <span>Export CSV</span>
  <Download size={18} />
</Button>
