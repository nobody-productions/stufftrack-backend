import {Request, Response} from "express";
import {createQueryBuilder, getManager, getRepository} from "typeorm";
import {UserVideogame} from "../../entity/videogame/videogame.user.library";
import { Videogame } from "../../entity/videogame/videogame.entity";
import {Platform} from "../../entity/videogame/platform.entity";
import {
    VideogameUserLibraryValidation
} from "../../validation/userlibrary.validation";
import {isValidPostgresNumber} from "../../validation/utils.validation";

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
    // e unisco le due cose: piattaforme sul quale il gioco é uscito + videogioco stesso
    for(let i = 0; i < data.length; i++) {
        data[i]['videogame'].platforms = await getManager().getRepository(Platform)
            .createQueryBuilder()
            .select('vg_platform')
            .from(Platform, "vg_platform")
            .innerJoin('vg_videogame_platform', 'vg_videogame_platform', 'vg_platform.id = vg_videogame_platform.platform_id')
            .innerJoin('vg_videogame', 'vg_videogame', 'vg_videogame.id = vg_videogame_platform.videogame_id')
            .andWhere("vg_videogame.id = :id", {id: data[i]['videogame']['id']})
            .getMany();
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
    if (!isValidPostgresNumber(req.params.id)) {
        return res.status(400).send({message: "game id must be a valid number!"})
    }

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
    if (!isValidPostgresNumber(req.params.id)) {
        return res.status(400).send({message: "game id must be a valid number!"})
    }
    if (!isValidPostgresNumber(req.body.platform)) {
        return res.status(400).send({message: "platform id must be a valid number!"})
    }

    const repository = getManager().getRepository(UserVideogame);

    // forza lo user id dell'utente loggato cosi in caso di dati "strani" vengono fatti sull'utente corrente
    req.body.user = req['user'].id
    req.body.videogame = parseInt(req.params.id)

    // chk: errori in input
    const {error} = VideogameUserLibraryValidation.validate(req.body);
    if(error) {
        return res.status(400).send(error.details);
    }

    let videogame: any
    try {
        videogame = await repository.save(req.body);
    } catch (error) {
        return res.status(400).send({message: "error while saving, make sure you didn't already saved this game and try again"});
    }

    return res.status(201).send(videogame);
}

export const UpdateVideogameUserLibrary = async(req: Request, res: Response) => {
    if (!isValidPostgresNumber(req.params.id)) {
        return res.status(400).send({message: "game id must be a valid number!"})
    }

    const oldV = await getManager().getRepository(Videogame).findOne({where: {id: parseInt(req.params.id)}})

    // chk: errori in input
    if(oldV === null) {
        return res.status(400).send({message: "videogame does not exists!"});
    }

    req.body.videogame = req.params.id

    const {error} = VideogameUserLibraryValidation.validate(req.body);
    if(error) {
        return res.status(400).send(error.details);
    }
    try {
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
    } catch (error) {
        return res.status(400).send(error.details);
    }
}


export const DeleteVideogameUserLibrary = async(req: Request, res: Response) => {
    if (!isValidPostgresNumber(req.params.id)) {
        return res.status(400).send({message: "game id must be a valid number!"})
    }

    const vg = await getManager().getRepository(Videogame).findOne({where: {id: parseInt(req.params.id)}})

    if(vg == undefined) {
        return res.status(404).send({message: "game not found!"})
    }

    await getRepository(UserVideogame).createQueryBuilder()
        .delete()
        .andWhere(`videogame = :videogame`, { videogame: vg.id})
        .andWhere(`user = :user`, { user: req['user'].id})
        .execute();
    return res.status(204).send(null)
}
