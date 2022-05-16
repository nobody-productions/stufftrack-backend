import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Platform} from "../../entity/videogame/platform.entity";
import {Videogame} from "../../entity/videogame/videogame.entity";

// get all platforms
export const Platforms = async (req: Request, res: Response) => {
    const take = 15;
    const page = parseInt(req.query.page as string || '1' ) // by default is 1

    const repository = getManager().getRepository(Platform);
    const [data, total] = await repository.findAndCount({
        take,
        skip: (page - 1) * take,
        order: {
            name: "ASC"
        }
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

export const GetPlatform = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Platform);
    const data = await repository.findOne({
        where: {
          id: parseInt(req.params.id)
        }
    });

    if(data === null) {
        return res.status(404).send({
            message: 'Platform not found!'
        })
    }
    else
        return res.status(200).send(data)
}

// admin
export const CreatePlatform = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Platform);
    const platform = await repository.save(req.body);

    res.status(201).send(platform);
}

export const DeletePlatform = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Platform);
    const platform = await repository.delete(parseInt(req.params.id));

    res.status(204).send(null);
}