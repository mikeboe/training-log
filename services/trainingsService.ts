import { dbName } from "@/db/dbHelper";
import uuid from "react-native-uuid";
import * as SQLite from "expo-sqlite";
import { TrainingRun, trainingRunService } from "./trainingRunService";

export interface Training {
  id: string;
  name: string;
  date: string;
  location: string;
  runs?: TrainingRun[];
}

class TrainingsService {
  async getTrainings() {
    const db = await SQLite.openDatabaseAsync(dbName);
    const results: Training[] = await db.getAllAsync(`SELECT * FROM trainings`);
    return results;
  }

  async getTrainingById(id: string) {
    const db = await SQLite.openDatabaseAsync(dbName);
    const results: Training | null = await db.getFirstAsync(
      `SELECT * FROM trainings WHERE id = ?`,
      [id]
    );

    if (!results) {
      throw new Error(`Training with id ${id} not found`);
    }

    return results;
  }

  async createTraining(name: string, date: string, location: string) {
    const db = await SQLite.openDatabaseAsync(dbName);
    const id = uuid.v4();
    const results = await db.runAsync(
      `
        INSERT INTO trainings (id, name, date, location)
        VALUES (?, ?, ?, ?)
        RETURNING *
        `,
      [id, name, date, location]
    );
    return results;
  }

  async updateTraining(
    id: string,
    name: string,
    date: string,
    location: string
  ) {
    const db = await SQLite.openDatabaseAsync(dbName);
    const results = await db.runAsync(
      `
            UPDATE trainings
            SET name = coalesce(?, name),
                date = coalesce(?, date),
                location = coalesce(?, location)
            WHERE id = ?
            RETURNING *
            `,
      [name, date, location, id]
    );
    return results;
  }

  async deleteTraining(id: string) {
    const db = await SQLite.openDatabaseAsync(dbName);
    const results = await db.runAsync(`DELETE FROM trainings WHERE id = ?`, [
      id,
    ]);
    return true;
  }
}

export const trainingsService = new TrainingsService();
