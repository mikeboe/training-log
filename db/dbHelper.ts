// db/dbHelper.ts
import * as SQLite from "expo-sqlite";

const db = async () => {
  return await SQLite.openDatabaseAsync("db1.db");
};

// Export singleton instance
export { db };

export const dbName = "db1.db";

// version
export const getVersion = async () => {
  const results = await db.execAsync(`SELECT sqlite_version()`);
  return results;
};
