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
    const query = `SELECT  p.id, u2.username, p.text, p.url, p.title, p.description, p."imgUrl" as "postImg", u2."imgUrl" as "userImg", u2.id as "postUserId"
        FROM friends
        JOIN posts p 
            ON p."userId" = friends."friendId"
        JOIN users u1 
            ON friends."userId" = u1.id
        JOIN users u2
            ON friends."friendId" = u2.id
        WHERE u1.id = $1`;
    const values = [userId];
    return db.query(query, values);
}

async function fetchUserPosts(userId) {
    const query = `SELECT  p.id, u.username, p.text, p.url, p.title, p.description, p."imgUrl" as "postImg", u."imgUrl" as "userImg"
        FROM posts p
        JOIN users u
            ON p."userId" = u.id
            WHERE p."userId" = $1`;
    const values = [userId];
    return db.query(query, values);
}

const postsRepository = {
    createPosts,
    showPosts,
    fetchFriendsPosts,
    fetchUserPosts,
};

export default postsRepository;
