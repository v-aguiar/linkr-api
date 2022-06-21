import { Router } from "express";
import authRouter from "./authRouter.js";
import postsRouter from "./postRouter.js";
import likesRouter from "./likesRouter.js";
import searchRouter from "./searchRouter.js";
import timelineRouter from "./timelineRoute.js";
import hashtagsRouter from "./hashtagsRoute.js";
import friendsRouter from "./friendsRouter.js";

const router = Router();

router.use(authRouter);
router.use(postsRouter);
router.use(likesRouter);
router.use(searchRouter);
router.use(timelineRouter);
router.use(hashtagsRouter);
router.use(friendsRouter);

export default router;
