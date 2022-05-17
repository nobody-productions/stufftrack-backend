import {Request, Response} from "express";
import {Status, UserVideogame} from "../../entity/videogame/videogame.user.library.entity";
import {getManager, getRepository} from "typeorm";
import {User} from "../../entity/user.entity";

export const GetNumberCompletedGames = async(req: Request, res: Response) => {
    const query = 'SELECT COUNT(vg_videogame.name)\n' +
        'FROM vg_user_videogame\n' +
        'JOIN vg_videogame ON vg_videogame.id = vg_user_videogame.videogame\n' +
        'JOIN "user" ON "user".id = vg_user_videogame."user"\n' +
        'AND "user".id = ' + req['user'].id + ' AND vg_user_videogame.status = \'' + Status.COMPLETATO + '\';\n'

    const result = await getManager().query(query)

    return res.status(200).send(result)
}

export const GetNumberFinishedGames = async(req: Request, res: Response) => {
    const query = 'SELECT COUNT(vg_videogame.name)\n' +
        'FROM vg_user_videogame\n' +
        'JOIN vg_videogame ON vg_videogame.id = vg_user_videogame.videogame\n' +
        'JOIN "user" ON "user".id = vg_user_videogame."user"\n' +
        'AND "user".id = ' + req['user'].id + ' AND vg_user_videogame.status = \'' + Status.FINITO + '\';\n'

    const result = await getManager().query(query)

    return res.status(200).send(result)
}

export const GetNumberToPlayGames = async(req: Request, res: Response) => {
    const query = 'SELECT COUNT(vg_videogame.name)\n' +
        'FROM vg_user_videogame\n' +
        'JOIN vg_videogame ON vg_videogame.id = vg_user_videogame.videogame\n' +
        'JOIN "user" ON "user".id = vg_user_videogame."user"\n' +
        'AND "user".id = ' + req['user'].id + ' AND vg_user_videogame.status = \'' + Status.DA_GIOCARE + '\';\n'

    const result = await getManager().query(query)

    return res.status(200).send(result)
}

export const GetNumberAbandonedGames = async(req: Request, res: Response) => {
    const query = 'SELECT COUNT(vg_videogame.name)\n' +
        'FROM vg_user_videogame\n' +
        'JOIN vg_videogame ON vg_videogame.id = vg_user_videogame.videogame\n' +
        'JOIN "user" ON "user".id = vg_user_videogame."user"\n' +
        'AND "user".id = ' + req['user'].id + ' AND vg_user_videogame.status = \'' + Status.ABBANDONATO + '\';\n'

    const result = await getManager().query(query)

    return res.status(200).send(result)
}

export const GetNumberNowPlayingGames = async(req: Request, res: Response) => {
    const query = 'SELECT COUNT(vg_videogame.name)\n' +
        'FROM vg_user_videogame\n' +
        'JOIN vg_videogame ON vg_videogame.id = vg_user_videogame.videogame\n' +
        'JOIN "user" ON "user".id = vg_user_videogame."user"\n' +
        'AND "user".id = ' + req['user'].id + ' AND vg_user_videogame.status = \'' + Status.IN_CORSO + '\';\n'

    const result = await getManager().query(query)

    return res.status(200).send(result)
}


export const GetNumberCompletedAndFinishedGames = async(req: Request, res: Response) => {
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
        'join vg_videogame vg on r.videogame = vg.id ' +
        'join "user" on r.user = "user".id ' +
        'AND "user".id = ' + req['user'].id +
        'order by r.ranking desc ' +
        'limit 20;'

    const result = await getManager().query(query)

    return res.status(200).send(result)
}

export const TotalBought = async(req: Request, res: Response) => {
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
    const query = ' SELECT COUNT(*)\n' +
        'FROM vg_user_videogame\n' +
        'JOIN vg_videogame ON vg_videogame.id = vg_user_videogame.videogame\n' +
        'JOIN "user" ON "user".id = vg_user_videogame."user"\n' +
        'AND "user".id = ' + req['user'].id + ';\n'

    const result = await getManager().query(query)

    return res.status(200).send(result)
}

// piattaforma sul quale hai finito o completato più cose
export const TopPlatform = async(req: Request, res: Response) => {
    const query = 'SELECT vg_platform.name "Platform", COUNT(vg_videogame.name) "Number of games"\n' +
        'FROM vg_user_videogame\n' +
        'JOIN vg_videogame ON vg_videogame.id = vg_user_videogame.videogame\n' +
        'JOIN vg_videogame_platform ON vg_videogame.id = vg_videogame_platform.videogame_id\n' +
        'JOIN vg_platform ON vg_platform.id = vg_user_videogame.platform\n' +
        'JOIN "user" ON "user".id = vg_user_videogame."user"\n' +
        'WHERE "user".id = ' + req['user'].id +
        'AND (vg_user_videogame.status = \'' + Status.COMPLETATO + '\'' +
        'OR vg_user_videogame.status = \'' + Status.FINITO + '\') ' +
        'GROUP BY vg_platform.name\n' +
        'ORDER BY "Number of games" DESC LIMIT 1;'
    const result = await getManager().query(query)

    return res.status(200).send(result)
}
