/*
- /api/v1/libraries/videogames/                       visualizzare / inserire / modificare / rimuovere un videogioco nella collezione dell'utente
- /api/v1/libraries/videogames/id/remakes             visualizzare / inserire / modificare / rimuovere un remake nella collezione dell'utente
- /api/v1/libraries/videogames/id/rating
* */

import {Request, Response} from "express";
import {createQueryBuilder, getManager} from "typeorm";
import {UserVideogame} from "../../entity/videogame/videogame.entity";
import {Platform} from "../../entity/videogame/platform.entity";

// get all videogames in user library
export const VideogameUserLibrary = async (req: Request, res: Response) => {
    const take = 15;
    const page = parseInt(req.query.page as string || '1' ) // by default is 1

    const repository = await getManager().getRepository(UserVideogame);
    const [data, total] = await repository.findAndCount({
        where: {user: req['user'].id},
        relations: ['videogame'],
        take,
        skip: (page - 1) * take,
    });

    // mi prendo le piattaforme
    for(let i = 0; i < data.length; i++) {
        const platOnly = await getManager().getRepository(Platform)
            .createQueryBuilder()
            .select('vg_platform')
            .from(Platform, "vg_platform")
            .innerJoin('vg_videogame_platform', 'vg_videogame_platform', 'vg_platform.id = vg_videogame_platform.platform_id')
            .innerJoin('vg_videogame', 'vg_videogame', 'vg_videogame.id = vg_videogame_platform.videogame_id')
            .andWhere("vg_videogame.id = :id", {id: data[i]['videogame']['id']})
        const platOnlyRes = await platOnly.getMany();

        // unisco le due cose: piattaforme sul quale il gioco é uscito + videogioco stesso
        data[i]['videogame'].platforms = platOnlyRes
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

export const GetVideogameUserLibrary = async (req: Request, res: Response) => {
    // mi prendo le piattaforme
    const platOnly = await getManager().getRepository(Platform)
        .createQueryBuilder()
        .select('vg_platform')
        .from(Platform, "vg_platform")
        .innerJoin('vg_videogame_platform', 'vg_videogame_platform', 'vg_platform.id = vg_videogame_platform.platform_id')
        .innerJoin('vg_videogame', 'vg_videogame', 'vg_videogame_platform.videogame_id = vg_videogame.id')
        .where("vg_videogame.id = :id", { id: req.params.id })
    const platOnlyRes = await platOnly.getMany();

    // query normale senza piattaforme dentro il videogioco
    const query = createQueryBuilder('vg_user_videogame', 'uvg')
        .innerJoinAndSelect('uvg.videogame', 'vg')
        .innerJoinAndSelect('uvg.platform', 'platform')
        .andWhere({'user': req['user']})
        .andWhere({'videogame': req.params.id})

    const result = await query.getOne();

    // unisco le due cose: piattaforme sul quale il gioco é uscito + videogioco stesso
    if (result !== null)
        result['videogame'].platform = platOnlyRes

    res.send(result)
}

