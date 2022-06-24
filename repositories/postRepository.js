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
        `SELECT p.id, u.username, p.text, p.url, p.title, p.description, p."imgUrl" as "postImg", u."imgUrl" as "userImg"
        FROM posts p 
        JOIN users u 
        ON u.id = p."userId" 
        ORDER BY p."createdAt" desc LIMIT 20`
    );
}

async function getRepostsByFilter(filter) {
    const repostsResult = await db.query(
        `SELECT sp."userId", sp."createdAt", sp."postId", u.id, u.username 
        FROM followers f
        RIGHT JOIN users u ON f."followedId" = u.id
        JOIN "sharedPosts" sp ON sp."userId" = u.id
        JOIN posts p ON p.id = sp."postId"
        JOIN "postStatus" s ON s.id = p."statusId"
        ${filter}`
    );

    const reposts = repostsResult.rows;
    const repostsInfo = [];
    for (let i = 0; i < reposts.length; i++) {
        const postId = reposts[i].postId;
        const filter = `WHERE p.id = ${postId} AND s.id != 3`;
        const post = await getPostsByFilter(filter);

        if (post.length > 0) {
            repostsInfo.push({
                ...post[0],
                repostInfo: {
                    userId: reposts[i].userId,
                    userName: reposts[i].name,
                },
                createdAt: reposts[i].createdAt,}
            );
        }
    }

    return repostsInfo;
}

const postsRepository = {
    createPosts,
    showPosts,
    getRepostsByFilter
};

export default postsRepository;
