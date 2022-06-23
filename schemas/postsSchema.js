import Joi from "joi";


const postSchema = Joi.object({
    url: Joi.string().uri().required(),
    text: Joi.string()
})

export default postSchema