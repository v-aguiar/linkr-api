import Joi from "joi";

export const searchSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    "string.empty": "⚠ Username is required!",
    "string.min": "⚠ Username must be at least 3 characters long!",
  }),
});
