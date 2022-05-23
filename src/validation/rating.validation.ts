import {Joi} from "express-validation";

export const RatingValidation = Joi.object({
    comment: Joi.string().max(5000),
    ranking: Joi.number().min(0).max(5),
    is_public_comment: Joi.boolean(),
    is_public_ranking: Joi.boolean()
})