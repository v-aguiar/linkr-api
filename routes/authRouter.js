import Router from "express";
import { login } from "../controllers/authController.js";
import { createUser } from "../controllers/userController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import signInSchema from "../schemas/signInSchema.js";
import signUpSchema from "../schemas/signUpSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signUpSchema), createUser);
authRouter.post("/sign-in", validateSchema(signInSchema), login);

export default authRouter;
