CREATE TABLE `sensor_data` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP,
	`acceleration_x` real,
	`acceleration_y` real,
	`acceleration_z` real,
	`air_pressure` real,
	`air_speed` real,
	`altitude` real,
	`temperature` real,
	`battery_voltage` real,
	`gps_coordinates` text,
	`gyroscope` real,
	`longitude` real,
	`satellites_tracked` real,
	`tilt_angle` real
);
