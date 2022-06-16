import { Router } from "express";
import authRouter from "./authRouter.js";
import postsRouter from "./postRouter.js";
import likesRouter from "./likesRouter.js";

const router = Router();

router.use(authRouter);
router.use(postsRouter);
router.use(likesRouter);

export default router;
