﻿import db from "../config/db.js";

// TODO - Reajustar quais informações serão retornadas no SELECT.
const searchRepository = {
  fetchUser: async (username) => {
    const query = `SELECT *
      FROM users
      WHERE username ILIKE $1||'%'`;
    const values = [username];

    return db.query(query, values);
  },

  fetchUserById: async (userId) => {
    const query = `SELECT *
      FROM users
      WHERE id = $1`;
    const values = [userId];

    return db.query(query, values);
  },
};

export default searchRepository;
