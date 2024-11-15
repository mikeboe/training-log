import { SQLiteDatabase } from "expo-sqlite";

export const initialMigration = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL
    );
  `);
};

export const addTrainingsTable = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS trainings (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      date TEXT NOT NULL,
      location TEXT NOT NULL
    );
  `);
};

export const addTrainingRunTable = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS training_runs (
      id TEXT PRIMARY KEY NOT NULL,
      training_id TEXT NOT NULL,
      type TEXT NOT NULL,
      trainer TEXT NOT NULL,
      description TEXT NOT NULL
    );
  `);
};

export const addTrainersTable = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS trainers (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL
    );
  `);
};

export const addTrainingTypesTable = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS training_types (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL
    );
  `);
};
