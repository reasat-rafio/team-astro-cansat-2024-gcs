CREATE TABLE `acceleration` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP,
	`x` real,
	`y` real,
	`z` real,
	`operation_id` integer,
	FOREIGN KEY (`operation_id`) REFERENCES `operation`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `air_pressure` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP,
	`value` real,
	`operation_id` integer,
	FOREIGN KEY (`operation_id`) REFERENCES `operation`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `air_speed` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP,
	`value` real,
	`operation_id` integer,
	FOREIGN KEY (`operation_id`) REFERENCES `operation`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `altitude` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP,
	`value` real,
	`operation_id` integer,
	FOREIGN KEY (`operation_id`) REFERENCES `operation`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `battery_voltage` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP,
	`value` real,
	`operation_id` integer,
	FOREIGN KEY (`operation_id`) REFERENCES `operation`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `gps_coordinates` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP,
	`value` text,
	`operation_id` integer,
	FOREIGN KEY (`operation_id`) REFERENCES `operation`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `gyroscope` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP,
	`x` real,
	`y` real,
	`z` real,
	`operation_id` integer,
	FOREIGN KEY (`operation_id`) REFERENCES `operation`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `longitude` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP,
	`value` real,
	`operation_id` integer,
	FOREIGN KEY (`operation_id`) REFERENCES `operation`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `operation` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`timestamp` text
);
--> statement-breakpoint
CREATE TABLE `operation_to_sensor_data` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`operation_id` integer,
	`acceleration_id` integer,
	`air_pressure_id` integer,
	`air_speed_id` integer,
	`altitude_id` integer,
	`battery_voltage_id` integer,
	`gps_coordinates_id` integer,
	`gyroscope_id` integer,
	`longitude_id` integer,
	`satellites_tracked_id` integer,
	`temperature_id` integer,
	`tilt_angle_id` integer,
	FOREIGN KEY (`operation_id`) REFERENCES `operation`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`acceleration_id`) REFERENCES `acceleration`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`air_pressure_id`) REFERENCES `air_pressure`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`air_speed_id`) REFERENCES `air_speed`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`altitude_id`) REFERENCES `altitude`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`battery_voltage_id`) REFERENCES `battery_voltage`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`gps_coordinates_id`) REFERENCES `gps_coordinates`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`gyroscope_id`) REFERENCES `gyroscope`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`longitude_id`) REFERENCES `longitude`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`satellites_tracked_id`) REFERENCES `satellites_tracked`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`temperature_id`) REFERENCES `temperature`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tilt_angle_id`) REFERENCES `tilt_angle`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `satellites_tracked` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP,
	`value` real,
	`operation_id` integer,
	FOREIGN KEY (`operation_id`) REFERENCES `operation`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `temperature` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP,
	`value` real,
	`operation_id` integer,
	FOREIGN KEY (`operation_id`) REFERENCES `operation`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tilt_angle` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP,
	`value` real,
	`operation_id` integer,
	FOREIGN KEY (`operation_id`) REFERENCES `operation`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP TABLE `sensor_data`;