import postsRepository from "../repositories/postRepository.js";

export async function createPost(req, res) {
    const { user } = res.locals;
    const { url, text } = req.body;
    const { metadata } = res.locals;

    try {
        await postsRepository.createPosts(user.id, url, text, metadata);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function getPosts(req, res) {
    try {
        const posts = await postsRepository.showPosts();
        return res.send(posts.rows);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function repost(req, res) {
    const { userId } = res.locals.tokenData;
    const {postId} = req.body;

    try {
        await sendRepost(userId, postId);
        res.sendStatus(201);
    } catch (error) {
        console.log("Error sending repost", error);
        res.sendStatus(500);
        return;
    }
}
