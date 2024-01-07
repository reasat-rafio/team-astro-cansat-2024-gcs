import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  driver: 'better-sqlite',
  verbose: true,
  strict: true,
  //   dbCredentials: {
  // connectionString: process.env.DB_URL,
  //   },
});
