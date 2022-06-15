import db from "../config/db.js";
import bcrypt from "bcrypt";

async function getUserByEmail(email) {
  return db.query("SELECT * FROM users WHERE email=$1", [email]);
}

async function createUser(email, password, username, imgUrl) {
  const SALT = Number(process.env.SALT);

  const passwordHash = bcrypt.hashSync(password, SALT);

  return db.query(
    `INSERT INTO users (email, password, username, "imgUrl") VALUES($1, $2, $3, $4)`,
    [email, passwordHash, username, imgUrl]
  );
}

async function getUserBySessionId(sessionId) {
  return db.query(
    `SELECT * FROM users u JOIN sessions s ON u.id=s."userId" WHERE s.id=$1`,
    [sessionId]
  );
}

const userRepository = {
  getUserByEmail,
  createUser,
  getUserBySessionId,
};

export default userRepository;
