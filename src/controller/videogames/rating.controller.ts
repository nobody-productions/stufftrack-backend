import {Request, Response} from "express";
import {createQueryBuilder, getManager, getRepository} from "typeorm";
import {Rating} from "../../entity/videogame/rating.entity";
import {Videogame} from "../../entity/videogame/videogame.entity";
import {User} from "../../entity/user.entity";

export const GetVideogameUserLibraryRating = async (req: Request, res: Response) => {
    const query = await
        getRepository(Rating)
            .createQueryBuilder("")
            .where("Rating.videogame = :id", { id: parseInt(req.params.id) })
            .andWhere('Rating.user = :user_id', { user_id: req['user'].id })
            .getOne();

    if(query !== null) {
        res.send(query)
    }
    else
        res.status(404).send({message: 'rating not found!'})
}

export const CreateVideogameUserLibraryRating = async(req: Request, res: Response) => {
    const repository = getManager().getRepository(Rating);

    let userTarget = await getManager().getRepository(User).findOne({where: {id: req['user'].id}})
    let vgTarget = await getManager().getRepository(Videogame).findOne({where: {id: parseInt(req.params.id)}})
    req.body.user = userTarget.id
    req.body.videogame = vgTarget.id

    // chk: rating already exists
    const chkRating = await getRepository(Rating).createQueryBuilder()
        .andWhere(`Rating.videogame = :videogame`, { videogame: vgTarget.id})
        .andWhere(`Rating.user = :user`, { user: userTarget.id})
        .getOne();

    if(chkRating !== null) {
        return res.status(409).send({message: "rating already exists!"})
    }

    const rating = await repository.save(req.body);

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
        .andWhere(`videogame = :videogame`, { videogame: vg.id})
        .andWhere(`user = :user`, { user: req['user'].id})
        .execute();
    return res.status(204).send(null)
}
