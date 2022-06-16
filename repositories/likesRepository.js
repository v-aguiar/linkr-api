import db from "../config/db";

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
    const value = userId === "" ? [postId] : [postId, userId];

    return db.query(query, value);
  },
};

export default likesRepository;
