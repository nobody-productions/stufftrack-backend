import {createConnections, getManager} from "typeorm";
import { Platform } from "../../entity/book/platform.entity";

createConnections().then(async () => {
    const repository = getManager().getRepository(Platform);

    await repository.save({
        name: "Cartaceo",
        path: "images/books/platforms/cartaceo.svg"
    })

    await repository.save({
        name: "Kobo",
        path: "images/books/platforms/kobo.svg"

    })

    await repository.save({
        name: "Kindle",
        path: "images/books/platforms/gba.svg"
    })

    await repository.save({
        name: "Tablet",
        path: "images/books/platforms/tablet.svg"
    })
})