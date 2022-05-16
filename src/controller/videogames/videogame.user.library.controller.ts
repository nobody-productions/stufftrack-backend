import {Request, Response} from "express";
import {createQueryBuilder, getConnection, getManager, getRepository} from "typeorm";
import {UserVideogame} from "../../entity/videogame/videogame.user.library";
import { Videogame } from "../../entity/videogame/videogame.entity";
import {Platform} from "../../entity/videogame/platform.entity";
import {Rating} from "../../entity/videogame/rating.entity";

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

    res.status(200).send(result)
}

// NOTA: crea una relationship tra gioco esistente nel db e utente loggato
export const CreateVideogameUserLibrary = async(req: Request, res: Response) => {
    const repository = getManager().getRepository(UserVideogame);

    // forza lo user id dell'utente loggato cosi in caso di dati "strani" vengono fatti sull'utente corrente
    req.body.id = req['user'].id

    const videogame = await repository.save(req.body);

    // TODO: sistemare in caso di duplicati
    res.status(201).send(videogame);
}

export const UpdateVideogameUserLibrary = async(req: Request, res: Response) => {
    const oldV = await getManager().getRepository(Videogame).findOne({where: {id: parseInt(req.params.id)}})
    await getRepository(UserVideogame).createQueryBuilder()
        .update()
        .set(req.body)
        .andWhere(`videogame = :videogame`, { videogame: oldV.id})
        .andWhere(`user = :user`, { user: req['user'].id})
        .execute();

    const actualV = await createQueryBuilder('vg_user_videogame', 'uvg')
        .innerJoinAndSelect('uvg.videogame', 'vg')
        .innerJoinAndSelect('uvg.platform', 'platform')
        .andWhere({'user': req['user']})
        .andWhere({'videogame': parseInt(req.params.id)})
        .getOne()
    return res.status(200).send(actualV)
}


export const DeleteVideogameUserLibrary = async(req: Request, res: Response) => {
    // parametri: videogame -> id: number
    const vg = await getManager().getRepository(Videogame).findOne({where: {id: parseInt(req.params.id)}})
    await getRepository(UserVideogame).createQueryBuilder()
        .delete()
        .andWhere(`videogame = :videogame`, { videogame: vg.id})
        .andWhere(`user = :user`, { user: req['user'].id})
        .execute();
    return res.status(204).send(null)
}
