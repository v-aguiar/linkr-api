import db from "../config/db.js";

const likesRepository = {
  fetchLikes: async (postId, userId = "") => {
    const query =
      userId === ""
        ? `SELECT COUNT(*) AS likes
        FROM likes 
        WHERE "postId" = $1`
        : `SELECT COUNT(*) AS likes
        FROM likes
        WHERE "postId" = $1 AND "userId" = $2`;
    const values = userId === "" ? [postId] : [postId, userId];

    return db.query(query, values);
  },

  fetchWhoElseLiked: async (postId, userId) => {
    const query = `SELECT u.username
      FROM likes l
      JOIN users u 
        ON u.id = l."userId"
      JOIN posts p 
        ON p.id = l."postId"
      WHERE p.id = $1 AND l."userId" != $2
      ORDER BY l."createdAt" DESC
      LIMIT 2;`;
    const values = [postId, userId];

    return db.query(query, values);
  },

  likePost: async (postId, userId) => {
    const query = `INSERT INTO likes ("postId", "userId")
      VALUES ($1, $2)
    `;
    const values = [postId, userId];

    return db.query(query, values);
  },

  unlikePost: async (postId, userId) => {
    const query = `DELETE FROM likes
      WHERE "postId" = $1 AND "userId" = $2
    `;
    const values = [postId, userId];

    return db.query(query, values);
  },
};

export default likesRepository;
