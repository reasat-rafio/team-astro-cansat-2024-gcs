<script lang="ts">
  import Papa from 'papaparse';
  import Button from '../ui/button/button.svelte';
  import { Download } from 'lucide-svelte';

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
    'CMD_ECHO',
  ];

  // prettier-ignore
  const dataArray: Array<Array<number | string | boolean>> = [
    // TEAM_ID, MISSION_TIME, PACKET_COUNT, MODE, STATE, ALTITUDE, AIR_SPEED, HS_DEPLOYED, PC_DEPLOYED, TEMPERATURE, VOLTAGE, PRESSURE, GPS_TIME, GPS_ALTITUDE, GPS_LATITUDE, GPS_LONGITUDE, GPS_SATS, TILT_X, TILT_Y, ROT_Z, CMD_ECHO
    header,
    [1, 100, 10, 'Mode1', 'State1', 500, 50, true, false, 25, 12.5, 1000, 1598245965, 600, 40.1234, -74.5678, 8, 0.5, 0.3, 45, 'Echo1'],
    [2, 200, 20, 'Mode2', 'State2', 600, 60, false, true, 28, 12.8, 1100, 1598245975, 700, 40.2345, -74.6789, 9, 0.6, 0.4, 50, 'Echo2'],
    [3, 300, 30, 'Mode3', 'State3', 700, 70, true, false, 30, 13.0, 1200, 1598245985, 800, 40.3456, -74.7890, 10, 0.7, 0.5, 55, 'Echo3']
  ];

  function handleCSVExport(fileName: string) {
    const csv = Papa.unparse(dataArray);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }
</script>

<Button
  on:click={() => handleCSVExport('Flight_2024.csv')}
  class="flex gap-2"
  variant="outline">
  <span>Export CSV</span>
  <Download size={18} />
</Button>
