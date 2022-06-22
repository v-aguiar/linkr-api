import db from "../config/db.js";



async function createPosts(userId, url, text){
    return db.query(
        `INSERT INTO posts ("userId", url, text) VALUES($1, $2, $3)`,
        [userId, url, text]
    )
}

async function showPosts(){
    return db.query(
        `SELECT u.username,p.text,p.url,u."imgUrl" FROM posts p 
        JOIN users u 
        ON u.id = p."userId" 
        ORDER BY p."createdAt" desc LIMIT 20`
    )
}


const postsRepository = {
    createPosts,
    showPosts
}

export default postsRepository