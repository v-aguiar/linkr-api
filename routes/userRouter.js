import { Router } from "express";
import { getUserId } from "../controllers/userController.js";
import { validateToken } from "../middlewares/authValidator.js";

const userRouter = Router();

userRouter.get("/userId", validateToken, getUserId);

export default userRouter;
