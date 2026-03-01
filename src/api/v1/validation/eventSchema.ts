import Joi from "joi";

export const createEventSchema = Joi.object({
    name: Joi.string().min(3).required(),
    
    date: Joi.date().iso().greater("now").required(),

    capacity: Joi.number().integer().min(5).required(),
    
})