CREATE TABLE `logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP,
	`text` text
);
--> statement-breakpoint
DROP TABLE `acceleration`;--> statement-breakpoint
DROP TABLE `air_pressure`;--> statement-breakpoint
DROP TABLE `air_speed`;--> statement-breakpoint
DROP TABLE `altitude`;--> statement-breakpoint
DROP TABLE `battery_voltage`;--> statement-breakpoint
DROP TABLE `gps_coordinates`;--> statement-breakpoint
DROP TABLE `gyroscope`;--> statement-breakpoint
DROP TABLE `longitude`;--> statement-breakpoint
DROP TABLE `operation`;--> statement-breakpoint
DROP TABLE `satellites_tracked`;--> statement-breakpoint
DROP TABLE `temperature`;--> statement-breakpoint
DROP TABLE `tilt_angle`;