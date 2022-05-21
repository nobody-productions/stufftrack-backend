import {Joi} from "express-validation";

export const CreateBookValidation = Joi.object({
    name: Joi.string().min(1).max(128).required(),
    description: Joi.string().min(1).max(5000).required(),
    year: Joi.number().min(1970).max(new Date().getFullYear()).required(),
    image: Joi.string().min(1).max(512)
})

export const UpdateBookValidation = Joi.object({
    name: Joi.string().min(1).max(128),
    description: Joi.string().min(1).max(5000),
    year: Joi.number().min(1970).max(new Date().getFullYear()),
    image: Joi.string().min(1).max(512)
})