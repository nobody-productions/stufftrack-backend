import { createConnections, getManager } from "typeorm";
import { Genre } from "../../entity/book/genre.entity";

createConnections().then(async () => {
    const repository = getManager().getRepository(Genre);
    // generi piu popolari in italiano dei libri
    await repository.save({
        name: "Giallo"
    })
    await repository.save({
        name: "Fantasy"
    })
    await repository.save({
        name: "Storico"
    })
    await repository.save({
        name: "Avventura"
    })
    await repository.save({
        name: "Fantascienza"
    })
    await repository.save({
        name: "Azione"
    })
    await repository.save({
        name: "Thriller"
    })
    await repository.save({
        name: "Horror"
    })
    await repository.save({
        name: "Commedia"
    })
    await repository.save({
        name: "Drammatico"
    })
    await repository.save({
        name: "Biografico"
    })
    await repository.save({
        name: "Romantico"
    })
    await repository.save({
        name: "Erotico"
    })
    await repository.save({
        name: "Orrore"
    })
    await repository.save({
        name: "Guerra"
    })
    await repository.save({
        name: "Bambini"
    })
    await repository.save({
        name: "Poesie"
    })
    await repository.save({
        name: "Psicologico"
    })

    await repository.save({
        name: "Manuale"
    })

    process.exit(0);
})