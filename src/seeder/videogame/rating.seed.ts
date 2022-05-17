import {createConnections, getManager} from "typeorm";
import { Rating } from "../../entity/videogame/rating.entity";
import {User} from "../../entity/user.entity";
import {Videogame} from "../../entity/videogame/videogame.entity";

createConnections().then(async () => {
    const ratingRepository = getManager().getRepository(Rating);

    //
    let userTarget = await getManager().getRepository(User).findOne({where: {id: 1}})
    let vgTarget = await getManager().getRepository(Videogame).findOne({where: {id: 1}})


    await ratingRepository.save({
        comment: "",
        ranking: 5,
        is_public_comment: true,
        is_public_ranking: true,
        user: userTarget,
        videogame: vgTarget
    })

    //
    vgTarget = await getManager().getRepository(Videogame).findOne({where: {id: 6}})

    await ratingRepository.save({
        comment: 'Terza generazione di pokémon: il gioco é il classico capitolo, ma qui hanno aggiunto delle cosine carine tipo la base segreta o il mago del quiz che propone enigmi. Non mi piacciono gli elementi grafici e in generale é un po troppo lento',
        ranking: 3,
        is_public_comment: true,
        is_public_ranking: true,
        user: userTarget,
        videogame: vgTarget
    })

    //
    vgTarget = await getManager().getRepository(Videogame).findOne({where: {id: 7}})

    await ratingRepository.save({
        comment: 'Mediocre, mi aspettavo di meglio ma ci ho comunque giocato molto.',
        ranking: 3,
        is_public_comment: true,
        is_public_ranking: true,
        user: userTarget,
        videogame: vgTarget
    })
})