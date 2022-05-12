import {createConnections, getManager} from "typeorm";
import { Videogame } from "../../entity/videogame/videogame.entity";
import { Platform } from "../../entity/videogame/platform.entity";
import { Developer } from "../../entity/videogame/developer.entity";
import { Genre } from "../../entity/videogame/genre.entity";

createConnections().then(async () => {
    const repository = getManager().getRepository(Videogame);

    await repository.save({
        name: "Super Mario Galaxy",
        description: "Mario può ottenere monete o Astroschegge se, rispettivamente, salta sui nemici oppure li colpisce con una piroetta. Alcuni nemici rimangono storditi se colpiti da una piroetta, per poi essere sconfitti da un calcio automatico che Mario esegue quando si avvicina ad essi.",
        year: 2007
    })

    let vg_target = await repository.findOne({where: {id: 1}})
    let platform = await getManager().getRepository(Platform).findOne({where: {codename: "WII"}})
    let developer = await getManager().getRepository(Developer).findOne({where: {name: "Nintendo"}})
    let genre = await getManager().getRepository(Genre).findOne({where: {name: "Avventura"}})
    await save_platform_to_db(vg_target, platform, repository)
    await save_developer_to_db(vg_target, developer, repository)
    await save_genre_to_db(vg_target, genre, repository)

    await repository.save({
        name: "Sonic",
        description: "Sonic the Hedgehog is a 2D side-scrolling platform game. The gameplay centers on Sonic the Hedgehog ability to run at high speed through levels that include springs, slopes, bottomless pits, and vertical loops. The levels are populated with hazards in the form of robots inside which Dr. Robotnik has trapped animals.",
        year: 1991
    })

    vg_target = await repository.findOne({where: {id: 2}})
    platform = await getManager().getRepository(Platform).findOne({where: {codename: "MD"}})
    developer = await getManager().getRepository(Developer).findOne({where: {name: "SEGA"}})
    await save_platform_to_db(vg_target, platform, repository)
    await save_developer_to_db(vg_target, developer, repository)
    await save_genre_to_db(vg_target, genre, repository)


    await repository.save({
        name: "Skyrim",
        description: 'Il nuovo motore di gioco di Skyrim dà vita a un mondo virtuale caratterizzato da fenomeni meteorologici, montagne erose dal tempo, città brulicanti di vita, distese verdeggianti e antichi sotterranei. Sono le tue azioni a definirti. Scegli fra centinaia di armi, incantesimi e abilità.',
        year: 2011
    })

    vg_target = await repository.findOne({where: {id: 3}})
    platform = await getManager().getRepository(Platform).findOne({where: {codename: "PC"}})
    developer = await getManager().getRepository(Developer).findOne({where: {name: "Bethesda"}})
    await save_platform_to_db(vg_target, platform, repository)
    await save_developer_to_db(vg_target, developer, repository)
    await save_genre_to_db(vg_target, genre, repository)


    await repository.save({
        name: "Life Is Strange",
        description: 'È un gioco a episodi, diviso in cinque episodi rilasciati in tempi diversi. Life is Strange racconta le gesta di Max Caulfield, una studentessa diciottenne, che scopre di possedere il potere di riavvolgere il tempo quando salva la sua amica d infanzia, Chloe Price, dall essere uccisa.',
        year: 2015
    })

    vg_target = await repository.findOne({where: {id: 4}})
    platform = await getManager().getRepository(Platform).findOne({where: {codename: "PC"}})
    await save_platform_to_db(vg_target, platform, repository)

    platform = await getManager().getRepository(Platform).findOne({where: {codename: "SWITCH"}})
    await save_platform_to_db(vg_target, platform, repository)

    developer = await getManager().getRepository(Developer).findOne({where: {name: "DONTNOD"}})
    await save_developer_to_db(vg_target, developer, repository)
    await save_genre_to_db(vg_target, genre, repository)


    await repository.save({
        name: "Remember Me",
        description: 'Caratterizza Remember Me un mix di esplorazione, platform, stealth e combattimenti corpo a corpo. Il gioco introduce un meccanismo di memory-remixing: entrare in possesso e riorganizzare i ricordi di un bersaglio manipolandoli.',
        year: 2013
    })

    vg_target = await repository.findOne({where: {id: 5}})
    platform = await getManager().getRepository(Platform).findOne({where: {codename: "PC"}})
    developer = await getManager().getRepository(Developer).findOne({where: {name: "DONTNOD"}})
    await save_platform_to_db(vg_target, platform, repository)
    await save_developer_to_db(vg_target, developer, repository)
    await save_genre_to_db(vg_target, genre, repository)    // salva avventura

    genre = await getManager().getRepository(Genre).findOne({where: {name: "Azione"}})
    await save_genre_to_db(vg_target, genre, repository)


    await repository.save({
        name: "Pokemon Zaffiro",
        description: 'Pokémon Rubino e Zaffiro si svolgono nella regione di Hoenn, situata a una certa distanza dalle regioni di Kanto e Johto presenti nei giochi precedenti. Il design di Hoenn è basato sulla regione di Kyūshū; tuttavia Hoenn è ruotata di 90° rispetto al territorio reale, poiché Junichi Masuda ha ritenuto che avrebbe fornito un migliore equilibrio di gioco. Come Kyūshū, Hoenn possiede molte isole minori e parte della regione è dominata da rotte marittime, molte delle quali contengono aree in cui il giocatore può immergersi sott acqua.',
        year: 2003
    })

    vg_target = await repository.findOne({where:{id: 6}})
    platform = await getManager().getRepository(Platform).findOne({where: {codename: "GBA"}})
    await save_platform_to_db(vg_target, platform, repository)
    developer = await getManager().getRepository(Developer).findOne({where: {name: "Nintendo"}})
    await save_developer_to_db(vg_target, developer, repository)
    genre = await getManager().getRepository(Genre).findOne({where: {name: "RPG"}})
    await save_genre_to_db(vg_target, genre, repository)
    genre = await getManager().getRepository(Genre).findOne({where: {name: "JRPG"}})
    await save_genre_to_db(vg_target, genre, repository)

    await repository.save({
        name: "Pokemon Alpha Zaffiro",
        description: 'Tuffati nell incredibile avventura di Pokémon Zaffiro Alpha su Nintendo 3DS e 2DS! Scopri una rivisitazione del mondo di Pokémon Versione Zaffiro, lanciato per Game Boy Advance nel 2003. Grazie alla sua grafica rinnovata e ai contenuti completamente inediti, avrai occasione di dimostrare di essere il miglior allenatore di Pokémon della regione, catturando, allenando e facendo lottare i tuoi Pokémon in questo avvincente RPG.',
        year: 2014
    })

    vg_target = await repository.findOne({where: {id: 7}})
    platform = await getManager().getRepository(Platform).findOne({where: {codename: "3DS"}})
    await save_platform_to_db(vg_target, platform, repository)
    developer = await getManager().getRepository(Developer).findOne({where: {name: "Nintendo"}})
    await save_developer_to_db(vg_target, developer, repository)
    genre = await getManager().getRepository(Genre).findOne({where: {name: "RPG"}})
    await save_genre_to_db(vg_target, genre, repository)
    genre = await getManager().getRepository(Genre).findOne({where: {name: "JRPG"}})
    await save_genre_to_db(vg_target, genre, repository)

    process.exit(0);
})

async function save_platform_to_db(destination, source, repository) {
    if (destination.platforms === undefined)
        destination.platforms = []
    destination.platforms.push(source)
    await repository.save(destination)
}

async function save_developer_to_db(destination, source, repository) {
    if (destination.developers === undefined)
        destination.developers = []
    destination.developers.push(source)
    await repository.save(destination)
}

async function save_genre_to_db(destination, source, repository) {
    if (destination.genres === undefined)
        destination.genres = []
    destination.genres.push(source)
    await repository.save(destination)
}
