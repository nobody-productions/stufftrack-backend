import {createConnections, getManager} from "typeorm";
import { Book } from "../../entity/book/book.entity";
import { Platform } from "../../entity/book/platform.entity";
import { Author } from "../../entity/book/author.entity";
import { Genre } from "../../entity/book/genre.entity";

createConnections().then(async () => {
    const repository = getManager().getRepository(Book);

    await repository.save({
        name: "It",
        description: "It is a 1986 horror novel by American author Stephen King. The story follows the experiences of seven children as they are terrorized by the eponymous being, which exploits the fears and phobias of its victims in order to disguise itself while hunting its prey. 'It' primarily appears in the form of a clown in order to attract its preferred prey of young children.",
        year: 1986,
        image: "/images/books/cover/it.png"

    })

    let bk_target = await repository.findOne({where: {id: 1}})
    let platform = await getManager().getRepository(Platform).findOne({where: {name: "Cartaceo"}})
    let author = await getManager().getRepository(Author).findOne({where: {nickname: "Stephen King"}})
    let genre = await getManager().getRepository(Genre).findOne({where: {name: "Orrore"}})
    await save_platform_to_db(bk_target, platform, repository)
    await save_author_to_db(bk_target, author, repository)
    await save_genre_to_db(bk_target, genre, repository)

    await repository.save({
        name: "Harry Potter and the Philosopher's Stone",
        description: "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The book is the first novel in the Harry Potter series and Rowling's debut novel, first published in 1997 by Bloomsbury. The plot follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. The plot follows Harry's struggle to overcome obstacles in his early years at the school, which include the ghost of a long-departed parent and the attacks of an evil warlock called the Sorcerer's Stone.",
        year: 1997,
        image: "/images/books/cover/harry_potter_and_the_philosopher_stone.png"
    })

    bk_target = await repository.findOne({where: {id: 2}})
    platform = await getManager().getRepository(Platform).findOne({where: {name: "Kindle"}})
    author = await getManager().getRepository(Author).findOne({where: {name: "J.K", surname: "Rowling"}})
    genre = await getManager().getRepository(Genre).findOne({where: {name: "Fantasy"}})
    await save_platform_to_db(bk_target, platform, repository)
    await save_author_to_db(bk_target, author, repository)
    await save_genre_to_db(bk_target, genre, repository)


    await repository.save({
        name: "1984",
        description: "George Orwell's 1984 is a dystopian novel published in 1949. It was the first book in the Orwell family of novels and the first published in full under the pen name of the writer. The novel presents a future in which the large number of countries of the world have been divided into two camps: the totalitarian states that have become the dominant power, and the democratic states that have become the oppressed.",
        year: 1949,
        image: "/images/books/cover/1984.png"
    })

    bk_target = await repository.findOne({where: {id: 3}})
    platform = await getManager().getRepository(Platform).findOne({where: {name: "Kobo"}})
    genre = await getManager().getRepository(Genre).findOne({where: {name: "Drammatico"}})
    author = await getManager().getRepository(Author).findOne({where: {name: "George", surname: "Orwell"}})
    await save_platform_to_db(bk_target, platform, repository)
    await save_author_to_db(bk_target, author, repository)
    await save_genre_to_db(bk_target, genre, repository)


    await repository.save({
        name: "The Hitchhiker's Guide to the Galaxy",
        description: "The Hitchhiker's Guide to the Galaxy is a comedy science fiction series created by Douglas Adams. It was first serialised on radio in 1978, and later on television in 1979, and on the BBC in 1980. It is one of the best-selling novels of all time, sold more than 100 million copies. The series is set in the fictional galaxy of the same name, and follows the adventures of the characters named in the series: Arthur Dent, Tricia McMillan, Peter Sellers, and Ford Prefect. The series is generally considered to be one of the best-looking novels ever written, and is considered to be one of the best-selling novels of all time. The series was adapted into a film by the British director Guy Ritchie, and a television series by the American writer and director Steven Moffat. The series was also adapted into a stage play by the British director Michael Crichton.",
        year: 1979,
        image: "/images/books/cover/the_hitchhiker_s_guide_to_the_galaxy.png"
    })

    genre = await getManager().getRepository(Genre).findOne({where: {name: "Fantascienza"}})
        bk_target = await repository.findOne({where: {id: 4}})
    platform = await getManager().getRepository(Platform).findOne({where: {name: "Kindle"}})
    await save_platform_to_db(bk_target, platform, repository)

    platform = await getManager().getRepository(Platform).findOne({where: {name: "Cartaceo"}})
    await save_platform_to_db(bk_target, platform, repository)

    author = await getManager().getRepository(Author).findOne({where: {name: "Douglas", surname: "Adams"}})
    await save_author_to_db(bk_target, author, repository)
    await save_genre_to_db(bk_target, genre, repository)


    await repository.save({
        name: "The Lord of the Rings",
        description: "The Lord of the Rings is a fantasy novel written by English author J. R. R. Tolkien. The story began as an account of how the events of The Hobbit were revealed and how the future of Middle-earth was revealed in The Lord of the Rings. It was published in 1937 by J. R. R. Tolkien's Sons of the Ring and in 1938 by Houghton Mifflin. The story is set in the fictional Middle-earth, a fictional world of the same name created by the author as a sequel to The Hobbit. The story follows the main characters of The Hobbit, Bilbo Baggins, Frodo Baggins, Gandalf the Grey, and Aragorn, as they explore the vast world of Middle-earth in the quest to destroy the One Ring, which makes the Hobbit trilogy the best-selling novel series of all time.",
        year: 1937,
        image: "/images/books/cover/the_lord_of_the_rings.png"
    })

    bk_target = await repository.findOne({where: {id: 5}})
    platform = await getManager().getRepository(Platform).findOne({where: {name: "Cartaceo"}})
    author = await getManager().getRepository(Author).findOne({where: {name: "J.R.R", surname: "Tolkien"}})
    genre = await getManager().getRepository(Genre).findOne({where: {name: "Fantasy"}})
    
    await save_platform_to_db(bk_target, platform, repository)
    await save_author_to_db(bk_target, author, repository)
    await save_genre_to_db(bk_target, genre, repository)

    genre = await getManager().getRepository(Genre).findOne({where: {name: "Avventura"}})
    await save_genre_to_db(bk_target, genre, repository)


    await repository.save({
        name: "Sherlock Holmes",
        description: "Sherlock Holmes is a fictional private detective created by British author Sir Arthur Conan Doyle. The story follows the adventures of Sherlock Holmes, a Scotland Yard official and Scotland Yard inspector, who deals with cases involving criminals and mysteries. The story is set in the year 1887, and follows Holmes' adventures from his own home in 221b Baker Street to Scotland Yard offices in London, where he meets his nemesis, Dr. John Watson, and becomes a regular witness in Scotland Yard cases. Sherlock Holmes is also a member of the fictional detective agency, Scotland Yard, which is based in London. Holmes is also a member of the British Academy's Society of Legal Medicine, and is a member of the British Academy's Society of Medicine, and the Royal Society of Medicine. Holmes is also a member of the British Academy's Society of Medicine, and the Royal Society of Medicine.",
        year: 1887,
        image: "/images/books/cover/sherlock_holmes.png"
    })

    bk_target = await repository.findOne({where:{id: 6}})
    platform = await getManager().getRepository(Platform).findOne({where: {name: "Kindle"}})
    await save_platform_to_db(bk_target, platform, repository)
    author = await getManager().getRepository(Author).findOne({where: {name: "Sir", surname: "Arthur Conan Doyle"}})
    await save_author_to_db(bk_target, author, repository)
    genre = await getManager().getRepository(Genre).findOne({where: {name: "Thriller"}})
    await save_genre_to_db(bk_target, genre, repository)
    genre = await getManager().getRepository(Genre).findOne({where: {name: "Mistero"}})
    await save_genre_to_db(bk_target, genre, repository)

    await repository.save({
        name: "Alice in Wonderland",
        description: "Alice in Wonderland is a children's fantasy novel written by English author Lewis Carroll. It is the first published children's book in the English-language series, and is the first of the main series of such books. It was first published in the United Kingdom in 1865, and in the United Kingdom and the United States in 1866. It is the first book in the Lewis Carroll series of novels, and the first of the main series of such books. The story follows the adventures of a young",
        year: 1865,
        image: "/images/books/cover/alice_in_wonderland.png"
    })

    bk_target = await repository.findOne({where: {id: 7}})
    platform = await getManager().getRepository(Platform).findOne({where: {name: "Kindle"}})
    await save_platform_to_db(bk_target, platform, repository)
    author = await getManager().getRepository(Author).findOne({where: {name: "Lewis", surname: "Carroll"}})
    await save_author_to_db(bk_target, author, repository)
    genre = await getManager().getRepository(Genre).findOne({where: {name: "Fantasy"}})
    await save_genre_to_db(bk_target, genre, repository)

    process.exit(0);
})

async function save_platform_to_db(destination, source, repository) {
    if (destination.platforms === undefined)
        destination.platforms = []
    destination.platforms.push(source)
    await repository.save(destination)
}

async function save_author_to_db(destination, source, repository) {
    if (destination.authors === undefined)
        destination.authors = []
    destination.authors.push(source)
    await repository.save(destination)
}

async function save_genre_to_db(destination, source, repository) {
    if (destination.genres === undefined)
        destination.genres = []
    destination.genres.push(source)
    await repository.save(destination)
}
