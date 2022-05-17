import {createConnections, getManager} from "typeorm";
import {Status, UserVideogame} from "../../entity/videogame/videogame.user.library.entity";
import { Videogame } from "../../entity/videogame/videogame.entity";
import {User} from "../../entity/user.entity";
import {Platform} from "../../entity/videogame/platform.entity";

createConnections().then(async () => {
    const ownRepo = getManager().getRepository(UserVideogame)

    // user 1
    let userTarget = await getManager().getRepository(User).findOne({where: {id: 1}})
    let vgTarget = await getManager().getRepository(Videogame).findOne({where: {id: 6}})
    let platformTarget = await getManager().getRepository(Platform).findOne({where: {codename: "GBA"}})

    await ownRepo.save({
        hours: 50,
        status: Status.FINITO,
        user: userTarget,
        videogame: vgTarget,
        platform: platformTarget
    })

    vgTarget = await getManager().getRepository(Videogame).findOne({where: {id: 7}})
    platformTarget = await getManager().getRepository(Platform).findOne({where: {codename: "3DS"}})

    await ownRepo.save({
        hours: 100,
        status: Status.FINITO,
        user: userTarget,
        videogame: vgTarget,
        platform: platformTarget
    })

    vgTarget = await getManager().getRepository(Videogame).findOne({where: {id: 1}})
    platformTarget = await getManager().getRepository(Platform).findOne({where: {codename: "WII"}})

    await ownRepo.save({
        hours: 20,
        status: Status.COMPLETATO,
        user: userTarget,
        videogame: vgTarget,
        platform: platformTarget
    })

    vgTarget = await getManager().getRepository(Videogame).findOne({where: {id: 2}})
    platformTarget = await getManager().getRepository(Platform).findOne({where: {codename: "MD"}})

    await ownRepo.save({
        hours: 100,
        status: Status.ABBANDONATO,
        finished: null,
        user: userTarget,
        videogame: vgTarget,
        platform: platformTarget
    })

    // user 2
    userTarget = await getManager().getRepository(User).findOne({where: {id: 2}})
    vgTarget = await getManager().getRepository(Videogame).findOne({where: {id: 6}})
    platformTarget = await getManager().getRepository(Platform).findOne({where: {codename: "GBA"}})

    await ownRepo.save({
        hours: 25,
        status: Status.IN_CORSO,
        finished: null,
        user: userTarget,
        videogame: vgTarget,
        platform: platformTarget
    })

    process.exit(0);
})
