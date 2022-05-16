import {Request, Response} from "express";
import {createQueryBuilder, getManager, getRepository} from "typeorm";
import {Rating} from "../../entity/videogame/rating.entity";
import {Videogame} from "../../entity/videogame/videogame.entity";
import {User} from "../../entity/user.entity";

export const GetVideogameUserLibraryRating = async (req: Request, res: Response) => {
    const query = await
        getRepository(Rating)
            .createQueryBuilder("")
            .where("videogame_id = :id", { id: req.params.id })
            .andWhere('user_id = :user_id', { user_id: req['user'].id })
            .getOne();

    if(query !== null) {
        res.send(query)
    }
    else
        res.status(404).send('rating not found!')
}

export const CreateVideogameUserLibraryRating = async(req: Request, res: Response) => {
    const repository = getManager().getRepository(Rating);

    // forza lo user id dell'utente loggato cosi in caso di dati "strani" vengono fatti sull'utente corrente
    let userTarget = await getManager().getRepository(User).findOne({where: {id: req['user'].id}})
    let vgTarget = await getManager().getRepository(Videogame).findOne({where: {id: parseInt(req.params.id)}})
    req.body.user = userTarget
    req.body.videogame = vgTarget

    const rating = await repository.save(req.body);

    // TODO: sistemare in caso di duplicati
    if(rating !== null) {
        delete rating.user
        return res.status(201).send(rating)
    }
    else
        return res.status(500).send('internal server error')
}

export const UpdateVideogameUserLibraryRating = async(req: Request, res: Response) => {
    const rating = await getManager().getRepository('vg_rating').findOne({where: {id: parseInt(req.params.id)}})
    await getRepository(Rating).createQueryBuilder()
        .update()
        .set(req.body)
        .andWhere(`videogame = :videogame`, { videogame: parseInt(req.params.id)})
        .andWhere(`user = :user`, { user: req['user'].id})
        .execute();

    const updatedRating = await createQueryBuilder('vg_rating', 'vg_rating')
        .andWhere({'user': req['user']})
        .andWhere({'videogame': parseInt(req.params.id)})
        .getOne()
    return res.status(200).send(updatedRating)
}

export const DeleteVideogameUserLibraryRating = async (req: Request, res: Response) => {
    const vg = await getManager().getRepository(Videogame).findOne({where: {id: parseInt(req.params.id)}})
    await getRepository('vg_rating').createQueryBuilder()
        .delete()
        .andWhere(`videogame_id = :videogame`, { videogame: vg.id})
        .andWhere(`user = :user`, { user: req['user'].id})
        .execute();
    return res.status(204).send(null)
}
