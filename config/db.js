import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const configDatabase = {
  connectionString: process.env.DATABASE_URL,
};

if (process.env.MODE === "PROD") {
  configDatabase.ssl = {
    rejectUnauthorized: false,
  };
}

const db = new Pool(configDatabase);

db.on("error", (err, client) => {
  console.error("⚠ Could not connect to database! ", err);
});

export default db;
