import Joi from "joi";

const friendsSchema = {
  userId: Joi.object({
    userId: Joi.number().integer().required().messages({
      "number.integer": "⚠ User ID must be an integer!",
      "number.empty": "⚠ User ID is required!",
    }),
  }),

  follow: Joi.object({
    userId: Joi.number().integer().required().messages({
      "number.integer": "⚠ User ID must be an integer!",
      "number.empty": "⚠ User ID is required!",
    }),
    friendId: Joi.number().integer().required().messages({
      "number.integer": "⚠ Friend ID must be an integer!",
      "number.empty": "⚠ Friend ID is required!",
    }),
  }),
};

export default friendsSchema;
