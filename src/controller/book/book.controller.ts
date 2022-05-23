import {Request, Response} from "express";
import {createQueryBuilder, getConnection, getManager, getRepository} from "typeorm";
import {Platform} from "../../entity/book/platform.entity";
import {Book} from "../../entity/book/book.entity";
import { CreateBookValidation, UpdateBookValidation } from "../../validation/book/book.validation";

// get all books
export const Books = async (req: Request, res: Response) => {
    const take = 15;
    const page = parseInt(req.query.page as string || '1' ) // by default is 1

    const repository = getManager().getRepository(Book);
    const [data, total] = await repository.findAndCount({
        relations: ['platforms', 'authors', 'genres'],
        order: {name: 'ASC'},
        take,
        skip: (page - 1) * take
    });

    // mi prendo le piattaforme
    for (const item of data) {
        // todo:risistemare query, aggiungere relations
        const platOnly = await getManager().getRepository(Platform)
            .createQueryBuilder()
            .select('bk_platform')
            .from(Platform, "bk_platform")
            .innerJoin('bk_book_platform', 'bk_book_platform', 'bk_platform.id = bk_book_platform.platform_id')
            .innerJoin('bk_book', 'bk_book', 'bk_book.id = bk_book_platform.book_id')
            .andWhere("bk_book.id = :id", {id: item['id']})

        // unisco le due cose: piattaforme sul quale il libro é uscito + libro stesso
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

export const GetBook = async (req: Request, res: Response) => {
    const bk = await getRepository(Book).find({
        where: {id: parseInt(req.params.id) },
        relations: ["platforms", "authors", "genres"]
    });

    if(bk == null) {
        res.status(404).send({message: "Book not found"});
    }
    else {
        res.status(200).send(bk)
    }
}


// admin cmd
export const CreateBook = async(req: Request, res: Response) => {
    // chk: errori in input
    const {error} = CreateBookValidation.validate(req.body);
    if(error) {
        return res.status(400).send(error.details);
    }

    const repository = getManager().getRepository(Book);

    let book: any
    try {
        book = await repository.save(req.body);
    } catch (error) {
    //    return res.status(400).send({message: "error while saving, make sure you didn't already saved this book and try again"});
        // TODO: due libri possono avere gli stessi dati -> fix temporaneo: il nome é unico
        return res.status(400).send({message: "error while saving, make sure you didn't already saved this book and try again"});
    }

    res.status(201).send(book);
}

export const UpdateBook = async(req: Request, res: Response) => {
    // chk: errori in input
    const {error} = UpdateBookValidation.validate(req.body);
    if(error) {
        return res.status(400).send(error.details);
    }

    await getRepository(Book).createQueryBuilder()
        .update()
        .set(req.body)
        .andWhere(`id = :id`, { id: parseInt(req.params.id)})
        .execute();
    const actualV = await getManager().getRepository(Book).findOne({where: {id: parseInt(req.params.id)}})

    return res.status(200).send(actualV)
}

export const DeleteBook = async(req: Request, res: Response) => {
    await getRepository(Book).createQueryBuilder()
        .delete()
        .andWhere(`id = :id`, { id: parseInt(req.params.id)})
        .execute();
    return res.status(204).send(null)
}