import { Router } from "express";

import { validateSchemaParams } from "../middlewares/schemaValidator.js";
import { fetchFriends } from "../controllers/friendsController.js";
import friendsSchema from "../schemas/friendsSchema.js";

const friendsRouter = Router();

friendsRouter.get(
  "/friends/:userId",
  validateSchemaParams(friendsSchema.userId),
  fetchFriends
);

export default friendsRouter;
