import {Request, Response} from "express";
import {getManager} from "typeorm";
import {User} from "../entity/user.entity";
import bcryptjs from "bcryptjs";

// get all users
export const Users = async (req: Request, res: Response) => {
    const take = 15;
    const page = parseInt(req.query.page as string || '1' ) // by default is 1

    const repository = getManager().getRepository(User);

    const [data, total] = await repository.findAndCount({
        take,
        skip: (page - 1) * take,
        relations: ['role']
    });

    res.send({
        data: data.map(u => {
            const {password, ...data} = u;
            return data;
        }),
        meta: {
            total,
            page,
            last_page: Math.ceil(total/take)
        }
    });
}

