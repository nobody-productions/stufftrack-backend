import {createConnections, getManager} from "typeorm";
import { Platform } from "../entity/videogames/platform.entity";

createConnections().then(async () => {
    const repository = getManager().getRepository(Platform);

    await repository.save({
        name: "Game Boy",
        codename: "GB"
    })

    await repository.save({
        name: "Game Boy Color",
        codename: "GBC"
    })

    await repository.save({
        name: "Game Boy Advance",
        codename: "GBA"
    })

    await repository.save({
        name: "Nintendo DS",
        codename: "NDS"
    })

    await repository.save({
        name: "Nintendo 3DS",
        codename: "3DS"
    })

    await repository.save({
        name: "Nintendo Wii",
        codename: "WII"
    })

    await repository.save({
        name: "Nintendo Entertainment System",
        codename: "NES"
    })

    await repository.save({
        name: "Virtual Boy",
        codename: "VB"
    })

    await repository.save({
        name: "Sega Mega Drive",
        codename: "MD"
    })

    await repository.save({
        name: "Sega Master System",
        codename: "SMS"
    })

    await repository.save({
        name: "Sony Playstation 1",
        codename: "PS1"
    })

    await repository.save({
        name: "Sony Playstation 2",
        codename: "PS2"
    })

    await repository.save({
        name: "Sony Playstation 3",
        codename: "PS3"
    })

    await repository.save({
        name: "Sony Playstation 4",
        codename: "PS4"
    })

    await repository.save({
        name: "Sony Playstation Portable",
        codename: "PSP"
    })

    await repository.save({
        name: "Xbox",
        codename: "XBOX"
    })

    await repository.save({
        name: "Xbox 360",
        codename: "X360"
    })

    await repository.save({
        name: "Xbox One",
        codename: "XONE"
    })

    await repository.save({
        name: "PC",
        codename: "PC"
    })

    await repository.save({
        name: "Nintendo Switch",
        codename: "SWITCH"
    })
})