import db from "../config/db.js";

async function createPosts(userId, url, text, metadata) {
    const { image, title, description } = metadata;

    return db.query(
        `INSERT INTO posts ("userId", url, text, "imgUrl", title, description) VALUES($1, $2, $3, $4, $5, $6)`,
        [userId, url, text, image, title, description]
    );
}

async function showPosts() {
    return db.query(
        `SELECT p.id, u.username, p.text, p.url, u."imgUrl" FROM posts p 
        JOIN users u 
        ON u.id = p."userId" 
        ORDER BY p."createdAt" desc LIMIT 20`
    );
}

const postsRepository = {
    createPosts,
    showPosts,
};

export default postsRepository;
