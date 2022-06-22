import Router from "express";
import { createPost, timeline } from "../controllers/postController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import postSchema from "../schemas/postsSchema.js";



const postsRouter = Router();

postsRouter.post("/post", validateSchema(postSchema), createPost)
postsRouter.get("/timeline", timeline)

export default postsRouter