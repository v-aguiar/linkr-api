import db from "../config/db.js";

async function createPosts(userId, url, text, metadata) {
    const { image, title, description } = metadata;

    const postId = await db.query(
        `INSERT INTO posts ("userId", url, text, "imgUrl", title, description) VALUES($1, $2, $3, $4, $5, $6) RETURNING id`,
        [userId, url, text, image, title, description]
    );

    return postId.rows[0].id;
}

async function showPosts() {
    return db.query(
        `SELECT p.id, u.username, p.text, p.url, p.title, p.description, p."imgUrl" as "postImg", u."imgUrl" as "userImg"
        FROM posts p 
        JOIN users u 
        ON u.id = p."userId" 
        ORDER BY p."createdAt" desc LIMIT 20`
    );
}

async function fetchFriendsPosts(userId) {
    const query = `SELECT  p.id, u.username, p.text, p.url, p.title, p.description, p."imgUrl" as "postImg", u."imgUrl" as "userImg"
        FROM friends
        JOIN posts p 
            ON p."userId" = friends."friendId"
        JOIN users u 
            ON friends."userId" = u.id
        WHERE u.id = $1`;
    const values = [userId];
    return db.query(query, values);
}

const postsRepository = {
    createPosts,
    showPosts,
    fetchFriendsPosts,
};

export default postsRepository;
