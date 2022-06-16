import { Router } from "express";
import authRouter from "./authRouter.js";
import postsRouter from "./postRouter.js";
import likesRouter from "./likesRouter.js";
import searchRouter from "./searchRouter.js";

const router = Router();

router.use(authRouter);
router.use(postsRouter);
router.use(likesRouter);
router.use(searchRouter);

export default router;
