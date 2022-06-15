import Joi from "joi";


const postSchema = Joi.object({
    userId: Joi.number().required(),
    url: Joi.string().uri().required(),
    text: Joi.string()
})

export default postSchema