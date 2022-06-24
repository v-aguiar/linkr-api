import { postHashtags } from "../repositories/hashtagsRepositories.js";
import postsRepository from "../repositories/postRepository.js";
import getHashtags from "../utils/getHashtags.js";

export async function createPost(req, res) {
    const { user } = res.locals;
    const { url, text } = req.body;
    const { metadata } = res.locals;

    const hashtags = getHashtags(text);

    try {
        const postId = await postsRepository.createPosts(
            user.id,
            url,
            text,
            metadata
        );

        if (hashtags) {
            hashtags.forEach((hashtag) => {
                postHashtags(hashtag, postId);
            });
        }

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

export async function fetchFriendsPosts(req, res) {
    const { userId } = req.params;

    try {
        const friendsPosts = await postsRepository.fetchFriendsPosts(userId);

        return res.send(friendsPosts.rows);
    } catch (error) {
        console.log("⚠ Error in fetchFriendsPosts ", error);
        return res.status(500).send("⚠ Error in fetchFriendsPosts ");
    }
}
