import postsRepository from "../repositories/postRepository.js"


export async function createPost(req, res){
    const {user} = res.locals
    const {url, text } = req.body

    try{
        await postsRepository.createPosts(user.id, url, text)
        return res.sendStatus(201)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function getPosts(req, res){

    try{
        const posts = await postsRepository.showPosts()
        return res.send(posts.rows)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}