import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;
const { Pool } = pg
 
const configDatabase = {
  connectionString,
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
