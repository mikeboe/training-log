import { dbName } from "@/db/dbHelper";
import { int } from "drizzle-orm/mysql-core";
import uuid from "react-native-uuid";
import * as SQLite from "expo-sqlite";

export interface TrainingType {
  id: string;
  name: string;
}

class TrainingTypeService {
  async getTraininingTypes() {
    const db = await SQLite.openDatabaseAsync(dbName);
    const results: TrainingType[] = await db.getAllAsync(
      `SELECT * FROM training_types ORDER BY name`
    );
    return results;
  }

  async getTrainingTypeById(id: string) {
    const db = await SQLite.openDatabaseAsync(dbName);
    const results: TrainingType | null = await db.getFirstAsync(
      `SELECT * FROM training_types WHERE id = ?`,
      [id]
    );
    if (!results) {
      throw new Error(`TrainingType with id ${id} not found`);
    }
    return results;
  }

  async createTrainingType(name: string) {
    const db = await SQLite.openDatabaseAsync(dbName);
    const id = uuid.v4() as string;
    const results = await db.runAsync(
      `
        INSERT INTO training_types (id, name)
        VALUES (?, ?)
        RETURNING *
        `,
      [id, name]
    );
    return results;
  }

  async updateTrainingType(id: string, name: string) {
    const db = await SQLite.openDatabaseAsync(dbName);
    const results = await db.runAsync(
      `
        UPDATE training_types
        SET name = coalesce(?, name)
        WHERE id = ?
        RETURNING *
        `,
      [name, id]
    );
    return results;
  }

  async deleteTrainingType(id: string) {
    const db = await SQLite.openDatabaseAsync(dbName);
    const results = await db.runAsync(
      `DELETE FROM training_types WHERE id = ?`,
      [id]
    );
    return results;
  }
}

export const trainingTypeService = new TrainingTypeService();
