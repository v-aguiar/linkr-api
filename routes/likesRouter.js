import { Router } from "express";

import { fetchLikes } from "../controllers/likesController.js";

const likesRouter = Router();

likesRouter.get("/likes/:postId", fetchLikes);

export default likesRouter;
