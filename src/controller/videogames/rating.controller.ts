import {Request, Response} from "express";
import {createQueryBuilder, getManager, getRepository} from "typeorm";
import {Rating} from "../../entity/videogame/rating.entity";
import {Videogame} from "../../entity/videogame/videogame.entity";
import {User} from "../../entity/user.entity";
import {VideogameUserLibraryRatingValidation} from "../../validation/rating.validation";
import {UserVideogame} from "../../entity/videogame/videogame.user.library.entity";

export const GetVideogameUserLibraryRating = async (req: Request, res: Response) => {
    const query = await
        getRepository("vg_rating").createQueryBuilder()
            .innerJoin("vg_user_videogame", "vg_user_videogame", "vg_user_videogame.rating = Rating.id")
            .andWhere("vg_user_videogame.videogame = :id", { id: parseInt(req.params.id) })
            .andWhere('vg_user_videogame."user" = :user_id', { user_id: req['user'].id })
            .getOne();

    if(query !== null) {
        res.send(query)
    }
    else
        res.status(404).send({message: 'rating not found!'})
}

export const CreateVideogameUserLibraryRating = async(req: Request, res: Response) => {
    // chk: errori in input
    const {error} = VideogameUserLibraryRatingValidation.validate(req.body);
    if(error) {
        return res.status(400).send(error.details);
    }

    const repository = getManager().getRepository(Rating);

    let userTarget = await getManager().getRepository(User).findOne({where: {id: req['user'].id}})
    let vgTarget = await getManager().getRepository(Videogame).findOne({where: {id: parseInt(req.params.id)}})
    req.body.user = userTarget.id
    req.body.videogame = vgTarget.id

    // chk: rating already exists
    const chkRating = await getRepository("vg_rating").createQueryBuilder()
        .innerJoin("vg_user_videogame", "vg_user_videogame", "vg_user_videogame.rating = Rating.id")
        .andWhere("vg_user_videogame.videogame = :id", { id: parseInt(req.params.id) })
        .andWhere('vg_user_videogame."user" = :user_id', { user_id: req['user'].id })
        .getOne();

    if(chkRating !== null) {
        return res.status(409).send({message: "rating already exists!"})
    }

    const rating = await repository.save(req.body);

    ///
    // vg_user_videogame needs to be updated
    ////
    const uvgRepo = await getManager().getRepository(UserVideogame)
    const uvg = await uvgRepo.createQueryBuilder()
        .andWhere({user: userTarget})
        .andWhere({videogame: vgTarget})
        .getOne()
    uvg.rating = rating

    let result = await uvgRepo.createQueryBuilder()
        .andWhere('user = :user', { user: userTarget.id })
        .andWhere('videogame = :videogame', { videogame: vgTarget.id })
        .update(UserVideogame)
        .set({rating: rating})
        .execute()

    if(result !== null) {
        return res.status(201).send(rating)
    }
    else
        return res.status(500).send('internal server error')
}

export const UpdateVideogameUserLibraryRating = async(req: Request, res: Response) => {
    // chk: errori in input
    const {error} = VideogameUserLibraryRatingValidation.validate(req.body);
    if(error) {
        return res.status(400).send(error.details);
    }

    // get rating target id
    const ratingTarget = await getRepository(UserVideogame).createQueryBuilder()
        .andWhere({'user': req['user']})
        .andWhere({'videogame': parseInt(req.params.id)})
        .getOne()

    // update rating
    await getRepository(Rating).createQueryBuilder()
        .update()
        .set(req.body)
        .andWhere(`id = :id`, { id: ratingTarget.rating })
        .execute();

    const updatedRating = await getRepository(Rating).createQueryBuilder()
        .andWhere(`id = :id`, { id: ratingTarget.rating })
        .getOne()
    return res.status(200).send(updatedRating)
}

export const DeleteVideogameUserLibraryRating = async (req: Request, res: Response) => {
    const vg = await getManager().getRepository(Videogame).findOne({where: {id: parseInt(req.params.id)}})
    const uvg = await getRepository(UserVideogame).createQueryBuilder()
        .andWhere(`videogame = :videogame`, { videogame: vg.id})
        .andWhere(`"user" = :user`, { user: req['user'].id})
        .getOne()

    await getRepository(Rating).createQueryBuilder()
        .delete()
        .andWhere(`id = :id`, { id: uvg.rating })
        .execute();


    return res.status(204).send(null)
}
