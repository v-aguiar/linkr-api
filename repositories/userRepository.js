import db from "../config/db.js";
import bcrypt from "bcrypt";

async function getUserByEmail(email) {
  return db.query("SELECT * FROM users WHERE email=$1", [email]);
}

async function createUser(email, password, username, imgUrl) {
  const SALT = process.env.SALT;

  const passwordHash = bcrypt.hashSync(password, SALT);
  return db.query(
    `INSERT INTO users (email, password, username, "imgUrl") VALUES($1, $2, $3, $4)`[
      (email, passwordHash, username, imgUrl)
    ]
  );
}

const userRepository = {
  getUserByEmail,
  createUser,
};
