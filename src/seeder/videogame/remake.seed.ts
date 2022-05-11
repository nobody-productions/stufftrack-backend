import {createConnections, getManager} from "typeorm";
import { Videogame } from "../../entity/videogame/videogame.entity";

createConnections().then(async () => {
    // pokemon zaffiro alpha é remake di pokemon zaffiro
    const repository = getManager().getRepository(Videogame)
    const vg1 = await repository.findOne({where: {id: 6}})
    const vg2 = await repository.findOne({where: {id: 7}})

    vg1.videogames = []
    vg1.videogames.push(vg2)

    await repository.save(vg1)

    process.exit(0);
})
