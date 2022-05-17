import {isValidPostgresNumber} from "../validation/utils.validation";


import {Request, Response} from "express";

export const CheckIdParamMiddleware = async (req: Request, res: Response, next: Function) => {
    req.params.id = Number(req.params.id.toString()).toString()

    if (!isValidPostgresNumber(Number(req.params.id))) {
        return res.status(400).send({message: "Id must be a valid integer!"})
    }
    next()
}