import {createConnections, getManager} from "typeorm";
import {Developer} from "../../entity/videogames/developer.entity";

createConnections().then(async () => {
    const repository = getManager().getRepository(Developer);

    await repository.save({
        name: "Nintendo"
    })
    await repository.save({
        name: "SEGA"
    })
    await repository.save({
        name: "Sony"
    })
    await repository.save({
        name: "Microsoft"
    })
    await repository.save({
        name: "TobyFox"
    })
    await repository.save({
        name: "Meat Team"
    })
    await repository.save({
        name: "DONTNOD"
    })
    await repository.save({
        name: "Ubisoft"
    })
    await repository.save({
        name: "Bethesda"
    })
    await repository.save({
        name: "Capcom"
    })
    process.exit(0);
})