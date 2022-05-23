import {createConnections, getManager} from "typeorm";
import { Rating } from "../../entity/book/rating.entity";
import {User} from "../../entity/user.entity";
import {Book} from "../../entity/book/book.entity";
import {UserLibraryBook} from "../../entity/book/book.user.library.entity";

createConnections().then(async () => {
    const ratingRepository = getManager().getRepository(Rating);

    //
    let userTarget = await getManager().getRepository(User).findOne({where: {id: 1}})
    let bkTarget = await getManager().getRepository(Book).findOne({where: {id: 1}})
    let ubkRepo = await getManager().getRepository(UserLibraryBook)
    let ubk = await ubkRepo.createQueryBuilder()
        .andWhere({user: userTarget})
        .andWhere({book: bkTarget})
        .getOne()

    let s = await ratingRepository.save({
        comment: "",
        ranking: 5,
        is_public_comment: true,
        is_public_ranking: true
    })

    ubk.rating = s

    await ubkRepo.createQueryBuilder()
        .andWhere('user = :user', { user: userTarget.id })
        .andWhere('book = :book', { book: bkTarget.id })
        .update(UserLibraryBook)
        .set({rating: s})
        .execute()

    //
    bkTarget = await getManager().getRepository(Book).findOne({where: {id: 6}})
    ubk = await ubkRepo.createQueryBuilder()
        .andWhere({user: userTarget})
        .andWhere({book: bkTarget})
        .getOne()

    let s2 = await ratingRepository.save({
        comment: 'Figo!',
        ranking: 3,
        is_public_comment: true,
        is_public_ranking: true
    })

    ubk.rating = s2

    await ubkRepo.createQueryBuilder()
        .andWhere('user = :user', { user: userTarget.id })
        .andWhere('book = :book', { book: bkTarget.id })
        .update(UserLibraryBook)
        .set({rating: s2})
        .execute()

    //
    bkTarget = await getManager().getRepository(Book).findOne({where: {id: 7}})
    ubk = await ubkRepo.createQueryBuilder()
        .andWhere({user: userTarget})
        .andWhere({book: bkTarget})
        .getOne()

    let s3 = await ratingRepository.save({
        comment: 'Mediocre, mi aspettavo di meglio ma l\'ho comunque letto.',
        ranking: 3,
        is_public_comment: true,
        is_public_ranking: true
    })


    ubk.rating = s3

    await ubkRepo.createQueryBuilder()
        .andWhere('user = :user', { user: userTarget.id })
        .andWhere('book = :book', { book: bkTarget.id })
        .update(UserLibraryBook)
        .set({rating: s3})
        .execute()


})