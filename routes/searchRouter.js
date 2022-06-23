import { Router } from "express";

import {
  searchUser,
  fetchUserById,
  fetchUserBySession,
} from "../controllers/searchController.js";
import { validateSchemaParams } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/authValidator.js";
import searchSchemas from "../schemas/searchSchema.js";

const searchRouter = Router();

searchRouter.get(
  "/user/searchName/:username",
  validateSchemaParams(searchSchemas.username),
  searchUser
);
searchRouter.get(
  "/user/searchId/:userId",
  validateSchemaParams(searchSchemas.userId),
  fetchUserById
);
searchRouter.get("/user/session", validateToken, fetchUserBySession);

export default searchRouter;
