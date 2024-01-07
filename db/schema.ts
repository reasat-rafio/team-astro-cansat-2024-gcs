import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const operation = sqliteTable('operation', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  start_time: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
  end_time: text('timestamp'),
});

export const acceleration = sqliteTable('acceleration', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
  x: real('x'),
  y: real('y'),
  z: real('z'),
  operation_id: integer('operation_id').references(() => operation.id),
});

export const air_pressure = sqliteTable('air_pressure', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
  value: real('value'),
  operation_id: integer('operation_id').references(() => operation.id),
});

export const air_speed = sqliteTable('air_speed', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
  value: real('value'),
  operation_id: integer('operation_id').references(() => operation.id),
});

export const altitude = sqliteTable('altitude', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
  value: real('value'),
  operation_id: integer('operation_id').references(() => operation.id),
});

export const battery_voltage = sqliteTable('battery_voltage', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
  value: real('value'),
  operation_id: integer('operation_id').references(() => operation.id),
});

export const gps_coordinates = sqliteTable('gps_coordinates', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
  value: text('value'),
  operation_id: integer('operation_id').references(() => operation.id),
});

export const gyroscope = sqliteTable('gyroscope', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
  x: real('x'),
  y: real('y'),
  z: real('z'),
  operation_id: integer('operation_id').references(() => operation.id),
});

export const longitude = sqliteTable('longitude', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
  value: real('value'),
  operation_id: integer('operation_id').references(() => operation.id),
});

export const satellites_tracked = sqliteTable('satellites_tracked', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
  value: real('value'),
  operation_id: integer('operation_id').references(() => operation.id),
});

export const temperature = sqliteTable('temperature', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
  value: real('value'),
  operation_id: integer('operation_id').references(() => operation.id),
});

export const tilt_angle = sqliteTable('tilt_angle', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
  value: real('value'),
  operation_id: integer('operation_id').references(() => operation.id),
});

// export const operation_to_sensor_data = sqliteTable(
//   'operation_to_sensor_data',
//   {
//     id: integer('id').primaryKey({ autoIncrement: true }),
//     operation_id: integer('operation_id').references(() => operation.id),
//     acceleration_id: integer('acceleration_id').references(
//       () => acceleration.id,
//     ),
//     air_pressure_id: integer('air_pressure_id').references(
//       () => air_pressure.id,
//     ),
//     air_speed_id: integer('air_speed_id').references(() => air_speed.id),
//     altitude_id: integer('altitude_id').references(() => altitude.id),
//     battery_voltage_id: integer('battery_voltage_id').references(
//       () => battery_voltage.id,
//     ),
//     gps_coordinates_id: integer('gps_coordinates_id').references(
//       () => gps_coordinates.id,
//     ),
//     gyroscope_id: integer('gyroscope_id').references(() => gyroscope.id),
//     longitude_id: integer('longitude_id').references(() => longitude.id),
//     satellites_tracked_id: integer('satellites_tracked_id').references(
//       () => satellites_tracked.id,
//     ),
//     temperature_id: integer('temperature_id').references(() => temperature.id),
//     tilt_angle_id: integer('tilt_angle_id').references(() => tilt_angle.id),
//   },
// );
