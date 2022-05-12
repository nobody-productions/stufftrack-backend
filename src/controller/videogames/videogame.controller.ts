import {Request, Response} from "express";
import {getManager} from "typeorm";
import { Videogame } from "../../entity/videogame/videogame.entity";

// get all videogames
export const Videogames = async (req: Request, res: Response) => {
    const take = 15;
    const page = parseInt(req.query.page as string || '1' ) // by default is 1

    const repository = getManager().getRepository(Videogame);
    const [data, total] = await repository.findAndCount({
        take,
        skip: (page - 1) * take
    });

    res.send({
        data,
        meta: {
            total,
            page,
            last_page: Math.ceil(total/take)
        }
    });
}

