import {Request, Response} from "express";
import {BookStatus} from "../../entity/book/book.user.library.entity";
import {getManager} from "typeorm";

export const TotalCompletedBooks = async(req: Request, res: Response) => {
    const query = 'SELECT COUNT(bk_book.name)\n' +
        'FROM bk_book_user\n' +
        'JOIN bk_book ON bk_book.id = bk_book_user.book\n' +
        'JOIN "user" ON "user".id = bk_book_user."user"\n' +
        'AND "user".id = ' + req['user'].id + ' AND bk_book_user.status = \'' + BookStatus.COMPLETATO + '\';\n'

    const result = await getManager().query(query)

    return res.status(200).send(result)
}

export const TotalToPlayBooks = async(req: Request, res: Response) => {
    const query = 'SELECT COUNT(bk_book.name)\n' +
        'FROM bk_book_user\n' +
        'JOIN bk_book ON bk_book.id = bk_book_user.book\n' +
        'JOIN "user" ON "user".id = bk_book_user."user"\n' +
        'AND "user".id = ' + req['user'].id + ' AND bk_book_user.status = \'' + BookStatus.DA_LEGGERE + '\';\n'

    const result = await getManager().query(query)

    return res.status(200).send(result)
}

export const TotalAbandonedBooks = async(req: Request, res: Response) => {
    const query = 'SELECT COUNT(bk_book.name)\n' +
        'FROM bk_book_user\n' +
        'JOIN bk_book ON bk_book.id = bk_book_user.book\n' +
        'JOIN "user" ON "user".id = bk_book_user."user"\n' +
        'AND "user".id = ' + req['user'].id + ' AND bk_book_user.status = \'' + BookStatus.ABBANDONATO + '\';\n'

    const result = await getManager().query(query)

    return res.status(200).send(result)
}

export const TotalNowPlayingBooks = async(req: Request, res: Response) => {
    const query = 'SELECT COUNT(bk_book.name)\n' +
        'FROM bk_book_user\n' +
        'JOIN bk_book ON bk_book.id = bk_book_user.book\n' +
        'JOIN "user" ON "user".id = bk_book_user."user"\n' +
        'AND "user".id = ' + req['user'].id + ' AND bk_book_user.status = \'' + BookStatus.IN_CORSO + '\';\n'

    const result = await getManager().query(query)

    return res.status(200).send(result)
}


export const Top20BooksEver = async(req: Request, res: Response) => {
    const query = 'select r.ranking, vg.name ' +
        'from bk_rating r ' +
        'join bk_book_user ubk on ubk.rating = r.id ' +
        'join bk_book vg on ubk.book = vg.id ' +
        'join "user" on ubk.user = "user".id ' +
        'AND "user".id = ' + req['user'].id +
        'order by r.ranking desc ' +
        'limit 20;'

    const result = await getManager().query(query)

    return res.status(200).send(result)
}

export const TotalBooksBought = async(req: Request, res: Response) => {
    const query = ' SELECT COUNT(*)\n' +
        'FROM bk_book_user\n' +
        'JOIN bk_book ON bk_book.id = bk_book_user.book\n' +
        'JOIN "user" ON "user".id = bk_book_user."user"\n' +
        'AND "user".id = ' + req['user'].id +
        'AND bk_book_user.bought = true;\n'

    const result = await getManager().query(query)

    return res.status(200).send(result)
}

export const TotalBooksEver = async(req: Request, res: Response) => {
    const query = ' SELECT COUNT(DISTINCT(bk_book.name))\n' +
        'FROM bk_book_user\n' +
        'JOIN bk_book ON bk_book.id = bk_book_user.book\n' +
        'JOIN "user" ON "user".id = bk_book_user."user"\n' +
        'AND "user".id = ' + req['user'].id + '\n' +
        'AND (bk_book_user.status = \'' + BookStatus.COMPLETATO + '\'' +
        'OR bk_book_user.status = \'' + BookStatus.ABBANDONATO + '\' ' +
        'OR bk_book_user.status = \'' + BookStatus.IN_CORSO + '\');'

    const result = await getManager().query(query)

    return res.status(200).send(result)
}

// piattaforma sul quale hai finito o completato più cose
export const TopBookPlatform = async(req: Request, res: Response) => {
    const query = 'SELECT bk_platform.name "platform", COUNT(bk_book.name) "number of books"\n' +
        'FROM bk_book_user\n' +
        'JOIN bk_book ON bk_book.id = bk_book_user.book\n' +
        'JOIN bk_book_platform ON bk_book.id = bk_book_platform.book_id\n' +
        'JOIN bk_platform ON bk_platform.id = bk_book_user.platform\n' +
        'JOIN "user" ON "user".id = bk_book_user."user"\n' +
        'WHERE "user".id = ' + req['user'].id +
        ' AND (bk_book_user.status = \'' + BookStatus.COMPLETATO + '\') ' +
        'GROUP BY bk_platform.name\n' +
        'ORDER BY "number of books" DESC LIMIT 1;'
    const result = await getManager().query(query)

    return res.status(200).send(result)
}

// piattaforma sul quale hai più libri (tranne quelli ancora da leggere)
export const MostUsedBookPlatform = async(req: Request, res: Response) => {
    const query = 'SELECT bk_platform.name "platform", COUNT(bk_book.name) "number of books"\n' +
        'FROM bk_book_user\n' +
        'JOIN bk_book ON bk_book.id = bk_book_user.book\n' +
        'JOIN bk_book_platform ON bk_book.id = bk_book_platform.book_id\n' +
        'JOIN bk_platform ON bk_platform.id = bk_book_user.platform\n' +
        'JOIN "user" ON "user".id = bk_book_user."user"\n' +
        'WHERE "user".id = ' + req['user'].id +
        'AND (bk_book_user.status = \'' + BookStatus.COMPLETATO + '\'' +
        'OR bk_book_user.status = \'' + BookStatus.ABBANDONATO + '\' ' +
        'OR bk_book_user.status = \'' + BookStatus.IN_CORSO + '\') ' +
        'GROUP BY bk_platform.name\n' +
        'ORDER BY "number of books" DESC LIMIT 1;'
    const result = await getManager().query(query)

    return res.status(200).send(result)
}

export const TotalBooksHours = async(req: Request, res: Response) => {
    const query = ' SELECT SUM(hours) "total"\n' +
        'FROM bk_book_user ubk\n' +
        'WHERE ubk.user = ' + req['user'].id + ';\n'

    const result = await getManager().query(query)

    // if we don't put this zero, we will return our result into an array item
    return res.status(200).send(result[0])
}
