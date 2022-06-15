import { Router } from "express";
import authRouter from "./authRouter.js";
import postsRouter from "./postRouter.js";

const router = Router();

router.use(authRouter);
router.use(postsRouter);

export default router;
