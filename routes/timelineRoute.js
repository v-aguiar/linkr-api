import { Router } from "express";
import {
  getTimeline,
  handleLike,
  postOnTimeline,
} from "../controllers/timelineController.js";
import { getTimelineValidator } from "../middlewares/timelineValidator.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import {
  createPostSchema,
  handleLikeSchema,
} from "../schemas/timelineSchemas.js";
import { validateToken } from "../middlewares/authValidator.js";

const timelineRouter = Router();

timelineRouter.use("/timeline", validateToken);

timelineRouter.get("/timeline", getTimelineValidator, getTimeline);
timelineRouter.post(
  "/timeline/post",
  validateSchema(createPostSchema),
  postOnTimeline
);
timelineRouter.post(
  "/timeline/post/:id/like",
  validateSchema(handleLikeSchema),
  handleLike
);

export default timelineRouter;
