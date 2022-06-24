import Router from "express";
import {
    createPost,
    fetchFriendsPosts,
    fetchUserPosts,
    getPosts,
} from "../controllers/postController.js";
import { validateToken } from "../middlewares/authValidator.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateUrl } from "../middlewares/urlValidator.js";
import postSchema from "../schemas/postsSchema.js";

const postsRouter = Router();

postsRouter.post(
    "/posts",
    validateToken,
    validateSchema(postSchema),
    validateUrl,
    createPost
);
postsRouter.get("/posts", validateToken, getPosts);
postsRouter.get("/posts/friends/:userId", validateToken, fetchFriendsPosts);
postsRouter.get("/posts/user/:userId", validateToken, fetchUserPosts);

export default postsRouter;
