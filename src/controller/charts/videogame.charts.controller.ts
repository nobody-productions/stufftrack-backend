import {Request, Response} from "express";
import {Status} from "../../entity/videogame/videogame.user.library.entity";
import {getManager} from "typeorm";

export const TotalCompletedGames = async(req: Request, res: Response) => {
    const query = 'SELECT COUNT(vg_videogame.name)\n' +
        'FROM vg_user_videogame\n' +
        'JOIN vg_videogame ON vg_videogame.id = vg_user_videogame.videogame\n' +
        'JOIN "user" ON "user".id = vg_user_videogame."user"\n' +
        'AND "user".id = ' + req['user'].id + ' AND vg_user_videogame.status = \'' + Status.COMPLETATO + '\';\n'

    const result = await getManager().query(query)

    return res.status(200).send(result)
}

export const TotalFinishedGames = async(req: Request, res: Response) => {
    const query = 'SELECT COUNT(vg_videogame.name)\n' +
        'FROM vg_user_videogame\n' +
        'JOIN vg_videogame ON vg_videogame.id = vg_user_videogame.videogame\n' +
        'JOIN "user" ON "user".id = vg_user_videogame."user"\n' +
        'AND "user".id = ' + req['user'].id + ' AND vg_user_videogame.status = \'' + Status.FINITO + '\';\n'

    const result = await getManager().query(query)

    return res.status(200).send(result)
}

export const TotalToPlayGames = async(req: Request, res: Response) => {
    const query = 'SELECT COUNT(vg_videogame.name)\n' +
        'FROM vg_user_videogame\n' +
        'JOIN vg_videogame ON vg_videogame.id = vg_user_videogame.videogame\n' +
        'JOIN "user" ON "user".id = vg_user_videogame."user"\n' +
        'AND "user".id = ' + req['user'].id + ' AND vg_user_videogame.status = \'' + Status.DA_GIOCARE + '\';\n'

    const result = await getManager().query(query)

    return res.status(200).send(result)
}

export const TotalAbandonedGames = async(req: Request, res: Response) => {
    const query = 'SELECT COUNT(vg_videogame.name)\n' +
        'FROM vg_user_videogame\n' +
        'JOIN vg_videogame ON vg_videogame.id = vg_user_videogame.videogame\n' +
        'JOIN "user" ON "user".id = vg_user_videogame."user"\n' +
        'AND "user".id = ' + req['user'].id + ' AND vg_user_videogame.status = \'' + Status.ABBANDONATO + '\';\n'

    const result = await getManager().query(query)

    return res.status(200).send(result)
}

export const TotalNowPlayingGames = async(req: Request, res: Response) => {
    const query = 'SELECT COUNT(vg_videogame.name)\n' +
        'FROM vg_user_videogame\n' +
        'JOIN vg_videogame ON vg_videogame.id = vg_user_videogame.videogame\n' +
        'JOIN "user" ON "user".id = vg_user_videogame."user"\n' +
        'AND "user".id = ' + req['user'].id + ' AND vg_user_videogame.status = \'' + Status.IN_CORSO + '\';\n'

    const result = await getManager().query(query)

    return res.status(200).send(result)
}


export const TotalCompletedAndFinishedGames = async(req: Request, res: Response) => {
    const query = 'SELECT COUNT(DISTINCT (vg_videogame.name))\n' +
        'FROM vg_user_videogame\n' +
        'JOIN vg_videogame ON vg_videogame.id = vg_user_videogame.videogame\n' +
        'JOIN "user" ON "user".id = vg_user_videogame."user"\n' +
        'AND "user".id = ' + req['user'].id +
        ' AND vg_user_videogame.status = \'' + Status.COMPLETATO + '\'' +
        ' OR vg_user_videogame.status = \'' + Status.FINITO + '\'' +
        ';\n'

    const result = await getManager().query(query)

    return res.status(200).send(result)
}

export const Top20VideogamesEver = async(req: Request, res: Response) => {
    const query = 'select r.ranking, vg.name ' +
        'from vg_rating r ' +
        'join vg_user_videogame uvg on uvg.rating = r.id ' +
        'join vg_videogame vg on uvg.videogame = vg.id ' +
        'join "user" on uvg.user = "user".id ' +
        'AND "user".id = ' + req['user'].id +
        'order by r.ranking desc ' +
        'limit 20;'

    const result = await getManager().query(query)

    return res.status(200).send(result)
}

export const TotalVideogamesBought = async(req: Request, res: Response) => {
    const query = ' SELECT COUNT(*)\n' +
        'FROM vg_user_videogame\n' +
        'JOIN vg_videogame ON vg_videogame.id = vg_user_videogame.videogame\n' +
        'JOIN "user" ON "user".id = vg_user_videogame."user"\n' +
        'AND "user".id = ' + req['user'].id +
        'AND vg_user_videogame.bought = true;\n'

    const result = await getManager().query(query)

    return res.status(200).send(result)
}

export const TotalVideogamesEver = async(req: Request, res: Response) => {
    const query = ' SELECT COUNT(DISTINCT(vg_videogame.name))\n' +
        'FROM vg_user_videogame\n' +
        'JOIN vg_videogame ON vg_videogame.id = vg_user_videogame.videogame\n' +
        'JOIN "user" ON "user".id = vg_user_videogame."user"\n' +
        'AND "user".id = ' + req['user'].id + '\n' +
        'AND (vg_user_videogame.status = \'' + Status.COMPLETATO + '\'' +
        'OR vg_user_videogame.status = \'' + Status.FINITO + '\' ' +
        'OR vg_user_videogame.status = \'' + Status.ABBANDONATO + '\' ' +
        'OR vg_user_videogame.status = \'' + Status.IN_CORSO + '\');'

    const result = await getManager().query(query)

    return res.status(200).send(result)
}

// piattaforma sul quale hai finito o completato più cose
export const TopVideogamePlatform = async(req: Request, res: Response) => {
    const query = 'SELECT vg_platform.name "platform", COUNT(vg_videogame.name) "number of games"\n' +
        'FROM vg_user_videogame\n' +
        'JOIN vg_videogame ON vg_videogame.id = vg_user_videogame.videogame\n' +
        'JOIN vg_videogame_platform ON vg_videogame.id = vg_videogame_platform.videogame_id\n' +
        'JOIN vg_platform ON vg_platform.id = vg_user_videogame.platform\n' +
        'JOIN "user" ON "user".id = vg_user_videogame."user"\n' +
        'WHERE "user".id = ' + req['user'].id +
        'AND (vg_user_videogame.status = \'' + Status.COMPLETATO + '\'' +
        'OR vg_user_videogame.status = \'' + Status.FINITO + '\') ' +
        'GROUP BY vg_platform.name\n' +
        'ORDER BY "number of games" DESC LIMIT 1;'
    const result = await getManager().query(query)

    return res.status(200).send(result)
}

// piattaforma sul quale hai più videogiochi (tranne quelli ancora da giocare)
export const MostUsedVideogamePlatform = async(req: Request, res: Response) => {
    const query = 'SELECT vg_platform.name "platform", COUNT(vg_videogame.name) "number of games"\n' +
        'FROM vg_user_videogame\n' +
        'JOIN vg_videogame ON vg_videogame.id = vg_user_videogame.videogame\n' +
        'JOIN vg_videogame_platform ON vg_videogame.id = vg_videogame_platform.videogame_id\n' +
        'JOIN vg_platform ON vg_platform.id = vg_user_videogame.platform\n' +
        'JOIN "user" ON "user".id = vg_user_videogame."user"\n' +
        'WHERE "user".id = ' + req['user'].id +
        'AND (vg_user_videogame.status = \'' + Status.COMPLETATO + '\'' +
        'OR vg_user_videogame.status = \'' + Status.FINITO + '\' ' +
        'OR vg_user_videogame.status = \'' + Status.ABBANDONATO + '\' ' +
        'OR vg_user_videogame.status = \'' + Status.IN_CORSO + '\') ' +
        'GROUP BY vg_platform.name\n' +
        'ORDER BY "number of games" DESC LIMIT 1;'
    const result = await getManager().query(query)

    return res.status(200).send(result)
}

export const TotalVideogamesHours = async(req: Request, res: Response) => {
    const query = ' SELECT SUM(hours) "total"\n' +
        'FROM vg_user_videogame uvg\n' +
        'WHERE uvg.user = ' + req['user'].id + ';\n'

    const result = await getManager().query(query)

    // if we don't put this zero, we will return our result into an array item
    return res.status(200).send(result[0])
}
