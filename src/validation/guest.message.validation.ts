import {Joi} from "express-validation";

export const GuestMessageValidation = Joi.object({
    name: Joi.string().required().max(50),
    surname: Joi.string().required().max(50),
    email: Joi.string().required().email(),
    message: Joi.string().required().max(5000),
})