import { dbName } from "@/db/dbHelper";
import { int } from "drizzle-orm/mysql-core";
import uuid from "react-native-uuid";
import * as SQLite from "expo-sqlite";

export interface Trainer {
  id: string;
  name: string;
}

class TrainerService {
  async getTrainers() {
    const db = await SQLite.openDatabaseAsync(dbName);
    const results: Trainer[] = await db.getAllAsync(
      `SELECT * FROM trainers ORDER BY name`
    );
    return results;
  }

  async getTrainerById(id: string) {
    const db = await SQLite.openDatabaseAsync(dbName);
    const results: Trainer | null = await db.getFirstAsync(
      `SELECT * FROM trainers WHERE id = ?`,
      [id]
    );
    if (!results) {
      throw new Error(`Trainer with id ${id} not found`);
    }
    return results;
  }

  async createTrainer(name: string) {
    const db = await SQLite.openDatabaseAsync(dbName);
    const id = uuid.v4() as string;
    const results = await db.runAsync(
      `
        INSERT INTO trainers (id, name)
        VALUES (?, ?)
        RETURNING *
        `,
      [id, name]
    );
    return results;
  }

  async updateTrainer(id: string, name: string) {
    const db = await SQLite.openDatabaseAsync(dbName);
    const results = await db.runAsync(
      `
        UPDATE trainers
        SET name = coalesce(?, name)
        WHERE id = ?
        RETURNING *
        `,
      [name, id]
    );
    return results;
  }
}

export const trainerService = new TrainerService();
