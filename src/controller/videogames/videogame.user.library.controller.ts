import {Request, Response} from "express";
import {createQueryBuilder, getManager, getRepository} from "typeorm";
import {UserVideogame} from "../../entity/videogame/videogame.user.library.entity";
import { Videogame } from "../../entity/videogame/videogame.entity";
import {Platform} from "../../entity/videogame/platform.entity";
import {
    VideogameUserLibraryValidation
} from "../../validation/videogame.user.library.validation";
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
        let vg = <Videogame> <unknown> await getManager().getRepository(Videogame).
            findOne({
                where: {id: data[i]['videogame']['id']},
                relations: ["platforms", "developers", "genres", 'videogames'],
            });
        data[i]['videogame'] = vg;
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
    const vg = await getRepository(Videogame).find({
        where: {id: parseInt(req.params.id) },
        relations: ["platforms", "developers", "genres", 'videogames']
    });

    if(vg.length == 0) {
        return res.status(404).send({message: "Videogame not found"});
    }
    const query = createQueryBuilder('vg_user_videogame', 'uvg')
        .innerJoinAndSelect('uvg.videogame', 'vg')
        .innerJoinAndSelect('uvg.platform', 'platform')
        .andWhere({'user': req['user']})
        .andWhere({'videogame': req.params.id})

    const result = await query.getOne();

    if (result === null)
        return res.status(404).send({message: "Videogame not found"});

    result['videogame'] = vg
    return res.status(200).send(result)
}

// NOTA: crea una relationship tra gioco esistente nel db e utente loggato
export const CreateVideogameUserLibrary = async(req: Request, res: Response) => {
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
    const oldV = await getManager().getRepository(Videogame).findOne({where: {id: parseInt(req.params.id)}})

    // chk: errori in input
    if(oldV === null) {
        return res.status(404).send({message: "game not found!"});
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
