import {Request, Response} from "express";
import {createQueryBuilder, getManager, getRepository} from "typeorm";
import {UserLibraryBook} from "../../entity/book/book.user.library.entity";
import { Book } from "../../entity/book/book.entity";
import { BookUserLibraryValidation } from "../../validation/book/book.user.library.validation";
import {isValidPostgresNumber} from "../../validation/utils.validation";

// get all books in user library
export const UserLibraryBooks = async (req: Request, res: Response) => {
    const take = 15;
    const page = parseInt(req.query.page as string || '1' ) // by default is 1

    const repository = await getManager().getRepository(UserLibraryBook);
    const [data, total] = await repository.findAndCount({
        where: {user: req['user'].id},
        take,
        skip: (page - 1) * take,
    });

    // mi prendo le piattaforme
    // e unisco le due cose: piattaforme sul quale il libro é uscito + libro stesso
    for(let i = 0; i < data.length; i++) {
        let bk = <Book> <unknown> await getManager().getRepository(Book).
            findOne({
                where: {id: data[i]['book']['id']},
                relations: ["platforms", "authors", "genres"],
            });
        data[i]['book'] = bk;
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

export const GetUserLibraryBook = async (req: Request, res: Response) => {
    const bk = await getRepository(Book).find({
        where: {id: parseInt(req.params.id) },
        relations: ["platforms", "authors", "genres"]
    });

    if(bk.length == 0) {
        return res.status(404).send({message: "Book not found"});
    }
    const query = createQueryBuilder('bk_book_user', 'ubk')
        .innerJoinAndSelect('ubk.book', 'bk')
        .innerJoinAndSelect('ubk.platform', 'platform')
        .andWhere({'user': req['user']})
        .andWhere({'book': req.params.id})

    const result = await query.getOne();

    if (result === null)
        return res.status(404).send({message: "Book not found"});

    result['book'] = bk
    return res.status(200).send(result)
}

// NOTA: crea una relationship tra libro esistente nel db e utente loggato
export const CreateUserLibraryBook = async(req: Request, res: Response) => {
    if (!isValidPostgresNumber(req.body.platform)) {
        return res.status(400).send({message: "platform id must be a valid number!"})
    }

    const repository = getManager().getRepository(UserLibraryBook);

    // forza lo user id dell'utente loggato cosi in caso di dati "strani" vengono fatti sull'utente corrente
    req.body.user = req['user'].id
    req.body.book = parseInt(req.params.id)

    // chk: errori in input
    const {error} = BookUserLibraryValidation.validate(req.body);
    if(error) {
        return res.status(400).send(error.details);
    }

    let book: any
    try {
        book = await repository.save(req.body);
    } catch (error) {
        return res.status(400).send({message: "error while saving, make sure you didn't already saved this game and try again"});
    }

    return res.status(201).send(book);
}

export const UpdateUserLibraryBook = async(req: Request, res: Response) => {
    const oldB = await getManager().getRepository(Book).findOne({where: {id: parseInt(req.params.id)}})

    // chk: errori in input
    if(oldB === null) {
        return res.status(404).send({message: "game not found!"});
    }

    req.body.book = req.params.id

    const {error} = BookUserLibraryValidation.validate(req.body);
    if(error) {
        return res.status(400).send(error.details);
    }
    try {
        await getRepository(UserLibraryBook).createQueryBuilder()
            .update()
            .set(req.body)
            .andWhere(`book = :book`, { book: oldB.id})
            .andWhere(`user = :user`, { user: req['user'].id})
            .execute();

        const actualB = await createQueryBuilder('bk_book_user', 'ubk')
            .innerJoinAndSelect('ubk.book', 'bk')
            .innerJoinAndSelect('ubk.platform', 'platform')
            .andWhere({'user': req['user']})
            .andWhere({'book': parseInt(req.params.id)})
            .getOne()
        return res.status(200).send(actualB)
    } catch (error) {
        return res.status(400).send(error.details);
    }
}


export const DeleteUserLibraryBook = async(req: Request, res: Response) => {
    const bk = await getManager().getRepository(Book).findOne({where: {id: parseInt(req.params.id)}})

    if(bk == undefined) {
        return res.status(404).send({message: "game not found!"})
    } 

    await getRepository(UserLibraryBook).createQueryBuilder()
        .delete()
        .andWhere(`book = :book`, { book: bk.id})
        .andWhere(`user = :user`, { user: req['user'].id})
        .execute();
    return res.status(204).send(null)
}
