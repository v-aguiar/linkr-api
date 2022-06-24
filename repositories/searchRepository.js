import db from "../config/db.js";

const searchRepository = {
    fetchUser: async (username) => {
        const query = `SELECT users."id", users."imgUrl", users."username"
      FROM users
      WHERE username ILIKE $1||'%'`;
        const values = [username];

        return db.query(query, values);
    },

    fetchUserById: async (userId) => {
        const query = `SELECT users."id", users."imgUrl", users."username"
      FROM users
      WHERE id = $1`;
        const values = [userId];

        return db.query(query, values);
    },
};

export default searchRepository;
