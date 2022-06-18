import { Router } from "express";
import { getHashtags, getHashtagPosts } from "../controllers/hashtagsController.js";
import { validateToken } from "../middlewares/authValidator.js";

const hashtagsRouter = Router();

hashtagsRouter.get('/hashtags', getHashtags);
hashtagsRouter.get('/hashtag/:hashtag', validateToken, getHashtagPosts);

export default hashtagsRouter;