import db from "../config/db.js";

const searchRepository = {
  fetchUser: async (username) => {
    const query = `SELECT *
      FROM users
      WHERE username ILIKE $1||'%'`;
    const values = [username];

    return db.query(query, values);
  },
};

export default searchRepository;
