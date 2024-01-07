import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const sensor_data = sqliteTable('sensor_data', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
  acceleration_x: real('acceleration_x'),
  acceleration_y: real('acceleration_y'),
  acceleration_z: real('acceleration_z'),
  air_pressure: real('air_pressure'),
  air_speed: real('air_speed'),
  altitude: real('altitude'),
  temperature: real('temperature'),
  battery_voltage: real('battery_voltage'),
  gps_coordinates: text('gps_coordinates'),
  gyroscope: real('gyroscope'),
  longitude: real('longitude'),
  satellites_tracked: real('satellites_tracked'),
  tilt_angle: real('tilt_angle'),
});
