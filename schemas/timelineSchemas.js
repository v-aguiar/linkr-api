import joi from "joi";

const regexUrl = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

export const createPostSchema = Joi.object().keys({
    text: joi.string().allow(null, "").required(),
    url: joi.string().regex(regexUrl).required(),
    hashtags: joi.array().items(joi.string()).required()
});

export const handleLikeSchema = joi.object().keys({
    liked: joi.boolean().required()
  });