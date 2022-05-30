import {Request, Response} from "express";
import {Rating} from "../../entity/book/rating.entity";
import {Book} from "../../entity/book/book.entity";
import {User} from "../../entity/user.entity";
import { UserLibraryBook } from "../../entity/book/book.user.library.entity";
import {RatingValidation} from "../../validation/rating.validation";
import {getManager, getRepository} from "typeorm";

export const GetUserLibraryBookRating = async (req: Request, res: Response) => {
    const query = await
        getRepository("bk_rating").createQueryBuilder()
            .innerJoin("bk_book_user", "bk_book_user", "bk_book_user.rating = Rating.id")
            .andWhere("bk_book_user.book = :id", { id: parseInt(req.params.id) })
            .andWhere('bk_book_user."user" = :user_id', { user_id: req['user'].id })
            .getOne();

    if(query !== null) {
        res.send(query)
    }
    else
        res.status(404).send({message: 'rating not found!'})
}

export const CreateUserLibraryBookRating = async(req: Request, res: Response) => {
    // chk: errori in input
    const {error} = RatingValidation.validate(req.body);
    if(error) {
        return res.status(400).send(error.details);
    }

    const repository = getManager().getRepository(Rating);

    let userTarget = await getManager().getRepository(User).findOne({where: {id: req['user'].id}})
    let bkTarget = await getManager().getRepository(Book).findOne({where: {id: parseInt(req.params.id)}})
    req.body.user = userTarget.id
    req.body.book = bkTarget.id

    // chk: rating already exists
    const chkRating = await getRepository("bk_rating").createQueryBuilder()
        .innerJoin("bk_book_user", "bk_book_user", "bk_book_user.rating = Rating.id")
        .andWhere("bk_book_user.book = :id", { id: parseInt(req.params.id) })
        .andWhere('bk_book_user."user" = :user_id', { user_id: req['user'].id })
        .getOne();

    if(chkRating !== null) {
        return res.status(409).send({message: "rating already exists!"})
    }

    const rating = await repository.save(req.body);

    ///
    // bk_book_user needs to be updated
    ////
    const ubkRepo = await getManager().getRepository(UserLibraryBook)
    const ubk = await ubkRepo.createQueryBuilder()
        .andWhere({user: userTarget})
        .andWhere({book: bkTarget})
        .getOne()
    ubk.rating = rating

    let result = await ubkRepo.createQueryBuilder()
        .andWhere('user = :user', { user: userTarget.id })
        .andWhere('book = :book', { book: bkTarget.id })
        .update(UserLibraryBook)
        .set({rating: rating})
        .execute()

    if(result !== null) {
        return res.status(201).send(rating)
    }
    else
        return res.status(500).send('internal server error')
}

export const UpdateUserLibraryBookRating = async(req: Request, res: Response) => {
    // chk: errori in input
    const {error} = RatingValidation.validate(req.body);
    if(error) {
        return res.status(400).send(error.details);
    }

    // get rating target id
    const ratingTarget = await getRepository(UserLibraryBook).createQueryBuilder()
        .andWhere({'user': req['user']})
        .andWhere({'book': parseInt(req.params.id)})
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

export const DeleteUserLibraryBookRating = async (req: Request, res: Response) => {
    const bk = await getManager().getRepository(Book).findOne({where: {id: parseInt(req.params.id)}})
    const ubk = await getRepository(UserLibraryBook).createQueryBuilder()
        .andWhere(`book = :book`, { book: bk.id})
        .andWhere(`"user" = :user`, { user: req['user'].id})
        .getOne()

    const ratingRepo = await getRepository(Rating)

    // we need to check if rating exists or not
    if(!(ubk.rating == null)) {
        await ratingRepo.createQueryBuilder()
        .delete()
        .andWhere(`id = :id`, { id: ubk.rating })
        .execute();
    }

    return res.status(204).send(null)
}
