import Joi from "joi";

const regexUrl = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

export const createPostSchema = Joi.object().keys({
    text: Joi.string().allow(null, "").required(),
    url: Joi.string().regex(regexUrl).required(),
    hashtags: Joi.array().items(Joi.string()).required()
});

export const handleLikeSchema = Joi.object().keys({
    liked: Joi.boolean().required()
  });