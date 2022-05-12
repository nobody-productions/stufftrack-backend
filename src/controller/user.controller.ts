import { Request, Response } from "express"
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";

// retrieve a user by sending its id
export const GetUser = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(User);
    let user = await repository.findOne({where: {id: parseInt(req.params.id)}, relations: ['role']})

    if(user !== null && user.active) {
        delete user.password
        delete user.active
        delete user.role.id
        res.send(user)
    }
    else
        res.status(404).send('User not found!')
}
