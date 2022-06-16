import { Router } from "express";

import { searchUser } from "../controllers/searchController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { searchSchema } from "../schemas/searchSchema.js";

const searchRouter = Router();

searchRouter.get("/user/search", validateSchema(searchSchema), searchUser);

export default searchRouter;
