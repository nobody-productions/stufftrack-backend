import {createConnections, getManager} from "typeorm";
import {BookStatus, UserLibraryBook} from "../../entity/book/book.user.library.entity";
import { Book } from "../../entity/book/book.entity";
import {User} from "../../entity/user.entity";
import {Platform} from "../../entity/book/platform.entity";

createConnections().then(async () => {
    const ownRepo = getManager().getRepository(UserLibraryBook)

    // user 1
    let userTarget = await getManager().getRepository(User).findOne({where: {id: 1}})
    let bkTarget = await getManager().getRepository(Book).findOne({where: {id: 6}})
    let platformTarget = await getManager().getRepository(Platform).findOne({where: {name: "Cartaceo"}})

    await ownRepo.save({
        hours: 50,
        status: BookStatus.COMPLETATO,
        user: userTarget,
        book: bkTarget,
        platform: platformTarget
    })

    bkTarget = await getManager().getRepository(Book).findOne({where: {id: 7}})
    platformTarget = await getManager().getRepository(Platform).findOne({where: {name: "Kindle"}})

    await ownRepo.save({
        hours: 100,
        status: BookStatus.COMPLETATO,
        user: userTarget,
        book: bkTarget,
        platform: platformTarget
    })

    bkTarget = await getManager().getRepository(Book).findOne({where: {id: 1}})
    platformTarget = await getManager().getRepository(Platform).findOne({where: {name: "Kobo"}})

    await ownRepo.save({
        hours: 20,
        status: BookStatus.COMPLETATO,
        user: userTarget,
        book: bkTarget,
        platform: platformTarget
    })

    bkTarget = await getManager().getRepository(Book).findOne({where: {id: 2}})
    platformTarget = await getManager().getRepository(Platform).findOne({where: {name: "Tablet"}})

    await ownRepo.save({
        hours: 100,
        status: BookStatus.ABBANDONATO,
        finished: null,
        user: userTarget,
        book: bkTarget,
        platform: platformTarget
    })

    // user 2
    userTarget = await getManager().getRepository(User).findOne({where: {id: 2}})
    bkTarget = await getManager().getRepository(Book).findOne({where: {id: 6}})
    platformTarget = await getManager().getRepository(Platform).findOne({where: {name: "Cartaceo"}})

    await ownRepo.save({
        hours: 25,
        status: BookStatus.IN_CORSO,
        finished: null,
        user: userTarget,
        book: bkTarget,
        platform: platformTarget
    })

    process.exit(0);
})
