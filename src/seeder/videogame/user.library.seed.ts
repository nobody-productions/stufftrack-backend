import {createConnections, getManager} from "typeorm";
import {Status, UserVideogame, Videogame} from "../../entity/videogame/videogame.entity";
import {User} from "../../entity/user.entity";

createConnections().then(async () => {
    const ownRepo = getManager().getRepository(UserVideogame)

    // user 1
    let userTarget = await getManager().getRepository(User).findOne({where: {id: 1}})
    let vgTarget = await getManager().getRepository(Videogame).findOne({where: {id: 6}})

    await ownRepo.save({
        hours: 50,
        status: Status.FINITO,
        user: userTarget,
        videogame: vgTarget
    })

    vgTarget = await getManager().getRepository(Videogame).findOne({where: {id: 7}})

    await ownRepo.save({
        hours: 100,
        status: Status.FINITO,
        user: userTarget,
        videogame: vgTarget
    })

    vgTarget = await getManager().getRepository(Videogame).findOne({where: {id: 1}})

    await ownRepo.save({
        hours: 20,
        status: Status.COMPLETATO,
        user: userTarget,
        videogame: vgTarget
    })

    vgTarget = await getManager().getRepository(Videogame).findOne({where: {id: 2}})

    await ownRepo.save({
        hours: 100,
        status: Status.ABBANDONATO,
        finished: null,
        user: userTarget,
        videogame: vgTarget
    })

    // user 2
    userTarget = await getManager().getRepository(User).findOne({where: {id: 2}})
    vgTarget = await getManager().getRepository(Videogame).findOne({where: {id: 6}})

    await ownRepo.save({
        hours: 25,
        status: Status.IN_CORSO,
        finished: null,
        user: userTarget,
        videogame: vgTarget
    })

    process.exit(0);
})
