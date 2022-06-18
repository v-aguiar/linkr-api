import db from "../config/db.js";

export async function getTimelineRepository(userId) {
    const timeline = await db.query(`
        SELECT u.username, u."imgUrl", p.id AS "postId", p."userid", COALESCE(p.text, '') AS text, p.url
        FROM users u
        JOIN posts p ON u.id = p."userid"
        ORDER BY p."createdAt" DESC
        LIMIT 20
    `);
    return timeline.rows;
}

export async function postOnTimelineRepository(userId, post) {
    const { text, url } = post;
    const body = text === '' ? null : text;

    const {rows: [{id}]} = await db.query(`
        INSERT INTO posts (userid, text, url)
        VALUES ($1, $2, $3)
        RETURNING id
    `, [userId, body, url]);

    return id;
}

export async function getHashtagByName(name) {
    const hashtagQuery = await db.query(`
        SELECT id
        FROM hashtags
        WHERE name = $1
  `, [name]);

  return hashtagQuery.rows[0] ? hashtagQuery.rows[0].id : undefined;
}

export async function createHashtag(name) {
    const {rows: [{id}]} = await db.query(`
        INSERT INTO hashtags (name)
        VALUES ($1)
        RETURNING id
    `, [name]);

    return id;
}

export async function insertHashtagsPost(hashtagId) {
    await db.query(`
        INSERT INTO "hashtagsPosts" ("postId", "hashtagId")
        VALUES ${hashtagId}
    `);
  }

  export async function handleLikeRepository(userId, postId, isLiked) {
    if( isLiked ) {
      await db.query(`
        INSERT INTO "likes" ("userId", "postId")
        VALUES ($1, $2)
      `, [userId, postId]);
    } else {
      await db.query(`
        DELETE FROM "likes"
        WHERE "userId" = $1 AND "postId" = $2
      `, [userId, postId]);
    }
  
    return await infoLikes(userId, postId);
  }
  
  export async function infoLikes(userId, postId) {
    const {rows: likes} = await db.query(`
      SELECT COUNT(*) AS "likes"
      FROM "likes"
      WHERE "postId" = $1
    `, [postId]);
  
    const {rows:liked} = await db.query(`
      SELECT * FROM "likes"
      WHERE "userId" = $1 AND "postId" = $2
    `, [userId, postId]);
  
    return {likes: likes[0].likes, liked: liked.length > 0};
  }