import {Request, Response} from "express";
import {createQueryBuilder, getConnection, getManager, getRepository} from "typeorm";
import {Videogame} from "../../entity/videogame/videogame.entity";
import {Platform} from "../../entity/videogame/platform.entity";
import {
    CreateVideogameValidation,
    UpdateVideogameValidation,
} from "../../validation/videogame.validation";

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

export const GetVideogame = async (req: Request, res: Response) => {
    const vg = await getRepository('vg_videogame').find({
        where: {id: parseInt(req.params.id) },
        relations: ['platforms'],
    });

    if(vg == null) {
        res.status(404).send({message: "Videogame not found"});
    }
    else {
        res.status(200).send(vg)
    }
}


export const GetVideogameRemake = async (req: Request, res: Response) => {
    const remake = await getConnection()
        .createQueryBuilder()
        .select("vg_remake")
        .from('vg_remake', "vg_remake")
        .where("original = :id", { id: parseInt(req.params.id) })
        .execute();

    res.status(200).send(remake)
}

// admin cmd
export const CreateVideogame = async(req: Request, res: Response) => {
    // chk: errori in input
    const {error} = CreateVideogameValidation.validate(req.body);
    if(error) {
        return res.status(400).send(error.details);
    }

    const repository = getManager().getRepository(Videogame);

    let videogame: any
    try {
        videogame = await repository.save(req.body);
    } catch (error) {
    //    return res.status(400).send({message: "error while saving, make sure you didn't already saved this game and try again"});
        // TODO: due videogiochi possono avere gli stessi dati -> fix temporaneo: il nome é unico
        // TODO: un videogioco deve avere anche per forza una casa di sviluppo ecc ecc, ma se facciamo il fetch da un altro sistema, questa cosa viene automaticamente soddisfatta.
        return res.status(400).send({message: "error while saving, make sure you didn't already saved this game and try again"});
    }

    res.status(201).send(videogame);
}

export const UpdateVideogame = async(req: Request, res: Response) => {
    // chk: errori in input
    const {error} = UpdateVideogameValidation.validate(req.body);
    if(error) {
        return res.status(400).send(error.details);
    }

    await getRepository(Videogame).createQueryBuilder()
        .update()
        .set(req.body)
        .andWhere(`id = :id`, { id: parseInt(req.params.id)})
        .execute();
    const actualV = await getManager().getRepository(Videogame).findOne({where: {id: parseInt(req.params.id)}})

    return res.status(200).send(actualV)
}

export const DeleteVideogame = async(req: Request, res: Response) => {
    await getRepository(Videogame).createQueryBuilder()
        .delete()
        .andWhere(`id = :id`, { id: parseInt(req.params.id)})
        .execute();
    return res.status(204).send(null)
}