import { Joi } from "express-validation";

// tutti i controlli
export const RegisterValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    password_confirm: Joi.string().required(),
    nickname: Joi.string().min(3).max(24),
    // TODO: propic
    bio: Joi.string().min(1).max(1000)
})