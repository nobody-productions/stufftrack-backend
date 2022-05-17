import {Request, Response} from "express";
import {Status} from "../../entity/videogame/videogame.user.library.entity";
import {getManager} from "typeorm";

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