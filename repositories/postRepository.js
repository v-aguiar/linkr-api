import db from "../config/db.js";



async function createPosts(userId, url, text){
    return db.query(
        `INSERT INTO posts (userId, url, text) VALUES($1, $2, $3)`,
        [userId, url, text]
    )
}

async function showPosts(){
    return db.query(
        `SELECT userId,text,url FROM posts ORDER BY "createdAt" desc LIMIT 20`
    )
}


const postsRepository = {
    createPosts,
    showPosts
}

export default postsRepository