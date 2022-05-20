import {createConnections, getManager} from "typeorm";
import { Platform } from "../../entity/videogame/platform.entity";

createConnections().then(async () => {
    const repository = getManager().getRepository(Platform);

    await repository.save({
        name: "Game Boy",
        codename: "GB",
        path: "images/platforms/gb.svg"
    })

    await repository.save({
        name: "Game Boy Color",
        codename: "GBC",
        path: "images/platforms/gb.svg"

    })

    await repository.save({
        name: "Game Boy Advance",
        codename: "GBA",
        path: "images/platforms/gba.svg"

    })

    await repository.save({
        name: "Nintendo DS",
        codename: "NDS",
        path: "images/platforms/nds.svg"

    })

    await repository.save({
        name: "Nintendo 3DS",
        codename: "3DS",
        path: "images/platforms/3ds.svg"

    })

    await repository.save({
        name: "Nintendo Wii",
        codename: "WII",
        path: "images/platforms/wii.svg"

    })

    await repository.save({
        name: "Nintendo Entertainment System",
        codename: "NES",
        path: "images/platforms/nes.svg"

    })

    await repository.save({
        name: "Virtual Boy",
        codename: "VB",
        path: "images/platforms/vb.svg"

    })

    await repository.save({
        name: "Sega Mega Drive",
        codename: "MD",
        path: "images/platforms/md.svg"

    })

    await repository.save({
        name: "Sega Master System",
        codename: "SMS",
        path: "images/platforms/sms.svg"

    })

    await repository.save({
        name: "Sony Playstation 1",
        codename: "PS1",
        path: "images/platforms/ps1.svg"

    })

    await repository.save({
        name: "Sony Playstation 2",
        codename: "PS2",
        path: "images/platforms/ps2.svg"

    })

    await repository.save({
        name: "Sony Playstation 3",
        codename: "PS3",
        path: "images/platforms/ps3.svg"

    })

    await repository.save({
        name: "Sony Playstation 4",
        codename: "PS4",
        path: "images/platforms/ps4.svg"

    })

    await repository.save({
        name: "Sony Playstation Portable",
        codename: "PSP",
        path: "images/platforms/ps5.svg"

    })

    await repository.save({
        name: "Xbox",
        codename: "XBOX",
        path: "images/platforms/xbox.svg"

    })

    await repository.save({
        name: "Xbox 360",
        codename: "X360",
        path: "images/platforms/350.svg"

    })

    await repository.save({
        name: "Xbox One",
        codename: "XONE",
        path: "images/platforms/one.svg"

    })

    await repository.save({
        name: "PC",
        codename: "PC",
        path: "images/platforms/pc.svg"

    })

    await repository.save({
        name: "Nintendo Switch",
        codename: "SWITCH",
        path: "images/platforms/switch.svg"
    })

    await repository.save({
        name: "Other platform",
        codename: "OTHER",
        path: "images/platforms/other.svg"
    })
})