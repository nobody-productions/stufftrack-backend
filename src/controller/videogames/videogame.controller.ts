import {Request, Response} from "express";
import {getManager} from "typeorm";
import { Videogame } from "../../entity/videogame/videogame.entity";
import {Platform} from "../../entity/videogame/platform.entity";

// get all videogames
export const Videogames = async (req: Request, res: Response) => {
    const take = 15;
    const page = parseInt(req.query.page as string || '1' ) // by default is 1

    const repository = getManager().getRepository(Videogame);
    const [data, total] = await repository.findAndCount({
        take,
        skip: (page - 1) * take
    });

    // mi prendo le piattaforme
    for (const item of data) {
        const platOnly = await getManager().getRepository(Platform)
            .createQueryBuilder()
            .select('vg_platform')
            .from(Platform, "vg_platform")
            .innerJoin('vg_videogame_platform', 'vg_videogame_platform', 'vg_platform.id = vg_videogame_platform.platform_id')
            .innerJoin('vg_videogame', 'vg_videogame', 'vg_videogame.id = vg_videogame_platform.videogame_id')
            .andWhere("vg_videogame.id = :id", {id: item['id']})

        // unisco le due cose: piattaforme sul quale il gioco é uscito + videogioco stesso
        item.platforms = await platOnly.getMany();
    }


    res.send({
        data,
        meta: {
            total,
            page,
            last_page: Math.ceil(total/take)
        }
    });
}
