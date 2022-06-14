import Joi from "joi";

const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  username: Joi.string().required(),
  imgUrl: Joi.string().uri().required(),
});

export default signUpSchema;
