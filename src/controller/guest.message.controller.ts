import { Request, Response } from "express"
import { getManager } from "typeorm";
import { GuestMessage } from "../entity/guest.message.entity";
import { GuestMessageValidation } from "../validation/guest.message.validation";

export const CreateGuestMessage = async (req: Request, res: Response) => {
    const {error} = GuestMessageValidation.validate(req.body);
    if(error) {
        return res.status(400).send(error.details);
    }

    const repository = getManager().getRepository(GuestMessage);

    let result = await repository
        .save({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            message: req.body.message
        })
    
    return res.status(200).send(result);
}
