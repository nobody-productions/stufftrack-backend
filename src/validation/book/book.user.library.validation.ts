import {Joi} from "express-validation";
import { BookStatus} from "../../entity/book/book.user.library.entity";

export const BookUserLibraryValidation = Joi.object({
    finished: Joi.date(),
    hours: Joi.number().min(0).max(999999),
    bought: Joi.boolean(),
    status: Joi.any().valid(...Object.values(BookStatus)),
    book: Joi.number().required(),
    platform: Joi.number().required(),
    user: Joi.number()
})