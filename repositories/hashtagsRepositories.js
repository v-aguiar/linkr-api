import db from "../config/db.js";

export async function getHashtagsRepository() {
    const hashtags = await db.query(`
        SELECT h."name", COUNT(hp."hashtagId") as count
        FROM hashtags h
        JOIN "hashtagsPosts" hp ON h.id = hp."hashtagId"
        GROUP BY h."name" 
        ORDER BY count desc limit 10
    `);
    return hashtags.rows;
}

export async function getHashtagPostsRepository(props) {
    const posts = await db.query(
        `
        SELECT p.id, p."text", p."url", p."userid", u."username", u."imgUrl"
        FROM posts p
        JOIN users u ON p."userid"=u.id
        JOIN "hashtagsPosts" hp ON p.id=hp."postId"
        JOIN hashtags h ON hp."hashtagId"=h.id
        WHERE h.name = $1
    `,
        [props]
    );
    return posts.rows;
}

export async function postHashtags(hashtag, postId) {
    const hashtagExists = await db.query(
        `SELECT * FROM hashtags WHERE name=$1`,
        [hashtag]
    );
    let hashtagId;

    if (!hashtagExists.rowCount) {
        hashtagId = await db.query(
            `INSERT INTO hashtags (name) VALUES ($1) RETURNING id`,
            [hashtag]
        );
        hashtagId = hashtagId.rows[0].id;
    } else {
        hashtagId = hashtagExists.rows[0].id;
    }

    await db.query(
        `INSERT INTO "hashtagsPosts" ("hashtagId", "postId") VALUES ($1, $2)`,
        [hashtagId, postId]
    );
}
