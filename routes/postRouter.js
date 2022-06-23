import Router from "express";
import { createPost, getPosts } from "../controllers/postController.js";
import { validateToken } from "../middlewares/authValidator.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateUrl } from "../middlewares/urlValidator.js";
import postSchema from "../schemas/postsSchema.js";



const postsRouter = Router();

postsRouter.post("/posts", validateToken, validateSchema(postSchema), validateUrl ,createPost)
postsRouter.get("/posts", getPosts)

export default postsRouter