"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var better_sqlite3_1 = require("drizzle-orm/better-sqlite3");
var migrator_1 = require("drizzle-orm/better-sqlite3/migrator");
var better_sqlite3_2 = require("better-sqlite3");
var betterSqlite = new better_sqlite3_2.default(':memory:');
var db = (0, better_sqlite3_1.drizzle)(betterSqlite);
(0, migrator_1.migrate)(db, { migrationsFolder: 'drizzle' });
betterSqlite.close();
