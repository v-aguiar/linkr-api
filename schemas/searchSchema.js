import Joi from "joi";

const searchSchemas = {
  username: Joi.object({
    username: Joi.string().min(3).required().messages({
      "string.empty": "⚠ Username is required!",
      "string.min": "⚠ Username must be at least 3 characters long!",
    }),
  }),

  userId: Joi.object({
    userId: Joi.number().integer().required().messages({
      "number.integer": "⚠ User ID must be an integer!",
      "number.empty": "⚠ User ID is required!",
    }),
  }),
};

export default searchSchemas;
