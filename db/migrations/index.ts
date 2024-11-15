import { SQLiteDatabase } from "expo-sqlite";
import * as SQLite from "expo-sqlite";
import {
  addTrainersTable,
  addTrainingRunTable,
  addTrainingTypesTable,
} from "./data/initial";

// Type for migration function
type MigrationFn = (db: SQLiteDatabase) => Promise<void>;

// Interface for migration definition
interface Migration {
  version: number;
  up: MigrationFn;
}

// Define your migrations
const migrations: Migration[] = [
  {
    version: 1,
    up: async (db: SQLiteDatabase) => {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT NOT NULL
        );
      `);
    },
  },
  {
    version: 2,
    up: async (db: SQLiteDatabase) => {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS trainings (
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          date TEXT NOT NULL,
          location TEXT NOT NULL
        );
      `);
    },
  },
  {
    version: 5,
    up: async (db: SQLiteDatabase) => {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS training_runs (
      id TEXT PRIMARY KEY NOT NULL,
      training_id TEXT NOT NULL,
      type TEXT NOT NULL,
      trainer TEXT NOT NULL,
      description TEXT NOT NULL
    );
      `);
    },
  },
  {
    version: 6,
    up: addTrainersTable,
  },
  {
    version: 7,
    up: addTrainingTypesTable,
  },

  // Add new migrations here with incrementing version numbers
];

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  console.log("Starting database migration check");

  // // Create migrations table if it doesn't exist
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY NOT NULL,
      applied_at TEXT NOT NULL
    );
  `);

  // Get current version
  const result = await db.getFirstAsync<{ version: number }>(`
    SELECT MAX(id) as version FROM migrations
  `);

  const currentVersion = result?.version || 0;
  console.log("Current database version:", currentVersion);

  // Sort migrations to ensure they run in order
  const pendingMigrations = migrations
    .filter((migration) => migration.version > currentVersion)
    .sort((a, b) => a.version - b.version);

  if (pendingMigrations.length === 0) {
    console.log("Database is up to date");
    return;
  }

  // Run each pending migration in a transaction
  for (const migration of pendingMigrations) {
    console.log(`Running migration to version ${migration.version}`);
    try {
      await db.withTransactionAsync(async () => {
        // Run the migration
        await migration.up(db);

        // Record that this migration was run
        await db.runAsync(
          "INSERT INTO migrations (id, applied_at) VALUES (?, ?)",
          [migration.version, new Date().toISOString()]
        );
      });
      console.log(`Successfully migrated to version ${migration.version}`);
    } catch (error) {
      console.error(`Migration to version ${migration.version} failed:`, error);
      throw error;
    }
  }

  console.log("All migrations completed successfully");
}
