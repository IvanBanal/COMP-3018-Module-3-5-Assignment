import Joi from "joi";

export const createEventSchema = Joi.object({
    name: Joi.string().min(3).required(),
})