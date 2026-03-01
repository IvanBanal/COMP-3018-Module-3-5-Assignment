import Joi from "joi";

export const createEventSchema = Joi.object({
    name: Joi.string().min(3).required(),
    
    date: Joi.date().iso().greater("now").required(),

    capacity: Joi.number().integer().min(5).required(),

    // Using Joi.ref("capacity"), we can reference the value of "capacity".
    registrationCount: Joi.number().integer().min(0).max(Joi.ref("capacity")).default(0),

})