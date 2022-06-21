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

  async follow(userId, friendId) {
    const query = `INSERT INTO friends
        ("userId", "friendId")
      VALUES ($1, $2)`;
    const values = [userId, friendId];

    return db.query(query, values);
  },

  async unfollow(userId, friendId) {
    const query = `DELETE FROM friends
      WHERE "userId" = $1 AND "friendId" = $2`;
    const values = [userId, friendId];

    return db.query(query, values);
  },
};

export default friendsRepository;
