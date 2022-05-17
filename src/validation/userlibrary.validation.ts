import {Joi} from "express-validation";
import {Status} from "../entity/videogame/videogame.user.library";

export const VideogameUserLibraryValidation = Joi.object({
    finished: Joi.date(),
    hours: Joi.number().min(0).max(999999),
    bought: Joi.boolean(),
    status: Joi.any().valid(...Object.values(Status)),
    videogame: Joi.number().required(),
    platform: Joi.number().required(),
    user: Joi.number()
})