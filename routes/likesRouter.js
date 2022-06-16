import { Router } from "express";

import { fetchLikes, fetchWhoLiked } from "../controllers/likesController.js";

const likesRouter = Router();

likesRouter.get("/likes/:postId", fetchLikes);
likesRouter.get("/likes/who/:postId/:userId", fetchWhoLiked);

export default likesRouter;
