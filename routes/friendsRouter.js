import { Router } from "express";

import {
  validateSchema,
  validateSchemaParams,
} from "../middlewares/schemaValidator.js";
import {
  fetchFriends,
  follow,
  unfollow,
} from "../controllers/friendsController.js";
import friendsSchema from "../schemas/friendsSchema.js";
import { validateToken } from "../middlewares/authValidator.js";

const friendsRouter = Router();

friendsRouter.get(
  "/friends/:userId",
  validateSchemaParams(friendsSchema.userId),
  fetchFriends
);
friendsRouter.post(
  "/friends/follow",
  validateToken,
  validateSchema(friendsSchema.follow),
  follow
);
friendsRouter.post(
  "/friends/unfollow",
  validateToken,
  validateSchema(friendsSchema.follow),
  unfollow
);

export default friendsRouter;
