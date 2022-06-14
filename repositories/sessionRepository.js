import db from "../config/db.js";

async function createSession(userId) {
  return db.query(`INSERT INTO sessions ("userId") VALUES ($1) RETURNING id`, [
    userId,
  ]);
}

const sessionRepository = {
  createSession,
};

export default sessionRepository;
