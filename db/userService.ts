import { db } from "./dbHelper";
import { v4 as uuidv4 } from "uuid";

export const userService = {
  async getUsers() {
    const results = await db.execAsync(`SELECT * FROM users`);
    console.log(results);
    return results;
  },

  async createUser(name: string) {
    const id = uuidv4();
    const results = await db.runAsync(
      `
      INSERT INTO users (id, name)
      VALUES (?, ?)
      RETURNING *
      `,
      [id, name]
    );
    console.log(results);
    return results;
  },
};
