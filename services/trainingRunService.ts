import { dbName } from "@/db/dbHelper";
import { int } from "drizzle-orm/mysql-core";
import uuid from "react-native-uuid";
import * as SQLite from "expo-sqlite";
import { trainerService } from "./trainersService";

export interface TrainingRun {
  id: string;
  training_id: string;
  type: string;
  trainer: string;
  description: string;
}

class TrainingRunService {
  async getTrainingRuns(trainingId: string) {
    const db = await SQLite.openDatabaseAsync(dbName);
    const results: TrainingRun[] = await db.getAllAsync(
      `SELECT * FROM training_runs WHERE training_id = ?`,
      [trainingId]
    );

    let runResults = [];
    for (const run of results) {
      const runTrainer = await trainerService.getTrainerById(run.trainer);
      runResults.push({
        ...run,
        trainer: runTrainer.name,
      });
    }
    return runResults;
  }

  async getTrainingRunById(id: string) {
    const db = await SQLite.openDatabaseAsync(dbName);
    const results: TrainingRun | null = await db.getFirstAsync(
      `SELECT * FROM training_runs WHERE id = ?`,
      [id]
    );
    if (!results) {
      throw new Error(`Training with id ${id} not found`);
    }
    return results;
  }

  async createTrainingRun(
    trainingId: string,
    type: string,
    trainer: string,
    description: string
  ) {
    const db = await SQLite.openDatabaseAsync(dbName);
    const id = uuid.v4() as string;
    const results = await db.runAsync(
      `
        INSERT INTO training_runs (id, training_id, type, trainer, description)
        VALUES (?, ?, ?, ?, ?)
        RETURNING *
        `,
      [id, trainingId, type, trainer, description]
    );
    return results;
  }

  async updateTrainingRun(
    id: string,
    type: string,
    trainer: string,
    description: string
  ) {
    const db = await SQLite.openDatabaseAsync(dbName);
    const results = await db.runAsync(
      `
            UPDATE training_runs
            SET type = coalesce(?, type),
                trainer = coalesce(?, trainer),
                description = coalesce(?, description)
            WHERE id = ?
            `,
      [type, trainer, description, id]
    );
    return results;
  }

  async deleteTrainingRun(id: string) {
    const db = await SQLite.openDatabaseAsync(dbName);
    const results = await db.runAsync(
      `DELETE FROM training_runs WHERE id = ?`,
      [id]
    );
    return true;
  }
}

export const trainingRunService = new TrainingRunService();
