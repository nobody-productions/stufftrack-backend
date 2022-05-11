import {createConnections, getManager} from "typeorm";
import {Genre} from "../../entity/videogames/genre.entity";

createConnections().then(async () => {
    const repository = getManager().getRepository(Genre);

    await repository.save({
        name: "Azione"
    })
    await repository.save({
        name: "Avventura grafica"
    })
    await repository.save({
        name: "Avventura testuale"
    })
    await repository.save({
        name: "3D"
    })
    await repository.save({
        name: "Avventura"
    })
    await repository.save({
        name: "Puzzle"
    })
    await repository.save({
        name: "Platform"
    })
    await repository.save({
        name: "RPG"
    })
    await repository.save({
        name: "JRPG"
    })
    await repository.save({
        name: "Educativo"
    })


    await repository.save({
        name: "Open World"
    })
    await repository.save({
        name: "Sandbox"
    })
    await repository.save({
        name: "FPS"
    })
    await repository.save({
        name: "Sparatutto"
    })
    await repository.save({
        name: "Multiplayer"
    })
    await repository.save({
        name: "Singleplayer"
    })
    await repository.save({
        name: "GDR"
    })
    await repository.save({
        name: "Musicale"
    })
    await repository.save({
        name: "Adulti"
    })
    await repository.save({
        name: "Survival"
    })

    await repository.save({
        name: "Horror"
    })
    await repository.save({
        name: "Strategico"
    })
    await repository.save({
        name: "Picchiaduro"
    })
    await repository.save({
        name: "Battle Royale"
    })
    await repository.save({
        name: "Bullethell"
    })
    await repository.save({
        name: "Simulazione"
    })
    await repository.save({
        name: "Sport manageriale"
    })
    await repository.save({
        name: "Sport"
    })
    await repository.save({
        name: "Visual Novel"
    })
    await repository.save({
        name: "Stealth"
    })

    process.exit(0);
})