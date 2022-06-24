import Router from "express";
import { createPost, getPosts } from "../controllers/postController.js";
import { validateToken } from "../middlewares/authValidator.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateUrl } from "../middlewares/urlValidator.js";
import postSchema from "../schemas/postsSchema.js";
import repostSchema from "../schemas/repostSchema.js";
import { repost } from "../controllers/postController.js";

const postsRouter = Router();

postsRouter.post(
    "/posts",
    validateToken,
    validateSchema(postSchema, repostSchema),
    validateUrl,
    createPost,
    repost
);
postsRouter.get("/posts", validateToken, getPosts);

export default postsRouter;
