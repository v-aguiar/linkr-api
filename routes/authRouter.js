import Router from "express";
import { createUser } from "../controllers/userController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import signUpSchema from "../schemas/signUpSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signUpSchema), createUser);

export default authRouter;
