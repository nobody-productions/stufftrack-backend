import {createConnections, getManager} from "typeorm";
import { Rating } from "../../entity/videogame/rating.entity";
import {User} from "../../entity/user.entity";
import {Videogame} from "../../entity/videogame/videogame.entity";
import {UserVideogame} from "../../entity/videogame/videogame.user.library.entity";

createConnections().then(async () => {
    const ratingRepository = getManager().getRepository(Rating);

    //
    let userTarget = await getManager().getRepository(User).findOne({where: {id: 1}})
    let vgTarget = await getManager().getRepository(Videogame).findOne({where: {id: 1}})
    let uvgRepo = await getManager().getRepository(UserVideogame)
    let uvg = await uvgRepo.createQueryBuilder()
        .andWhere({user: userTarget})
        .andWhere({videogame: vgTarget})
        .getOne()

    let s = await ratingRepository.save({
        comment: "",
        ranking: 5,
        is_public_comment: true,
        is_public_ranking: true
    })

    uvg.rating = s

    await uvgRepo.createQueryBuilder()
        .andWhere('user = :user', { user: userTarget.id })
        .andWhere('videogame = :videogame', { videogame: vgTarget.id })
        .update(UserVideogame)
        .set({rating: s})
        .execute()

    //
    vgTarget = await getManager().getRepository(Videogame).findOne({where: {id: 6}})
    uvg = await uvgRepo.createQueryBuilder()
        .andWhere({user: userTarget})
        .andWhere({videogame: vgTarget})
        .getOne()

    let s2 = await ratingRepository.save({
        comment: 'Terza generazione di pokémon: il gioco é il classico capitolo, ma qui hanno aggiunto delle cosine carine tipo la base segreta o il mago del quiz che propone enigmi. Non mi piacciono gli elementi grafici e in generale é un po troppo lento',
        ranking: 3,
        is_public_comment: true,
        is_public_ranking: true
    })

    uvg.rating = s2

    await uvgRepo.createQueryBuilder()
        .andWhere('user = :user', { user: userTarget.id })
        .andWhere('videogame = :videogame', { videogame: vgTarget.id })
        .update(UserVideogame)
        .set({rating: s2})
        .execute()

    //
    vgTarget = await getManager().getRepository(Videogame).findOne({where: {id: 7}})
    uvg = await uvgRepo.createQueryBuilder()
        .andWhere({user: userTarget})
        .andWhere({videogame: vgTarget})
        .getOne()

    let s3 = await ratingRepository.save({
        comment: 'Mediocre, mi aspettavo di meglio ma ci ho comunque giocato molto.',
        ranking: 3,
        is_public_comment: true,
        is_public_ranking: true
    })


    uvg.rating = s3

    await uvgRepo.createQueryBuilder()
        .andWhere('user = :user', { user: userTarget.id })
        .andWhere('videogame = :videogame', { videogame: vgTarget.id })
        .update(UserVideogame)
        .set({rating: s3})
        .execute()


})