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

// retrieve a user by sending its id
export const GetUser = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(User);
    const {password, ...user} = await repository.findOne({where:
            {id: parseInt(req.params.id)}, relations: ['role']});
    res.send(user)
}

// create a user with default password 1234
export const CreateUser = async(req: Request, res: Response) => {
    const {role_id, ...body} = req.body;
    const hashedPassword = await bcryptjs.hash('1234', 16);
    const repository = getManager().getRepository(User);

    const {password, ...user} = await repository.save(
        {
            ...body,
            password: hashedPassword,
            role: {
                id: role_id
            }
        }
    );

    res.status(201).send(user);
}

