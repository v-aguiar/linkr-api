import db from "../config/db.js";

const friendsRepository = {
  async fetchFriends(userId) {
    const query = `SELECT u."id", u."username", u."imgUrl"
      FROM users u
      JOIN friends f
      ON f."friendId" = u."id"
      WHERE f."userId" = $1`;
    const values = [userId];

    return db.query(query, values);
  },
};

export default friendsRepository;
