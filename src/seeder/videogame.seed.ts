import {createConnections, getManager} from "typeorm";
import { Videogame} from "../entity/videogames/videogame.entity";

createConnections().then(async () => {
    const repository = getManager().getRepository(Videogame);

    await repository.save({
        name: "Super Mario Galaxy",
        description: "Mario può ottenere monete o Astroschegge se, rispettivamente, salta sui nemici oppure li colpisce con una piroetta. Alcuni nemici rimangono storditi se colpiti da una piroetta, per poi essere sconfitti da un calcio automatico che Mario esegue quando si avvicina ad essi.",
        year: 2007
    })

    await repository.save({
        name: "Sonic",
        description: "Sonic the Hedgehog is a 2D side-scrolling platform game. The gameplay centers on Sonic the Hedgehog ability to run at high speed through levels that include springs, slopes, bottomless pits, and vertical loops. The levels are populated with hazards in the form of robots inside which Dr. Robotnik has trapped animals.",
        year: 1991
    })

    await repository.save({
        name: "Skyrim",
        description: 'Il nuovo motore di gioco di Skyrim dà vita a un mondo virtuale caratterizzato da fenomeni meteorologici, montagne erose dal tempo, città brulicanti di vita, distese verdeggianti e antichi sotterranei. Sono le tue azioni a definirti. Scegli fra centinaia di armi, incantesimi e abilità.',
        year: 2011
    })

    await repository.save({
        name: "Life Is Strange",
        description: 'È un gioco a episodi, diviso in cinque episodi rilasciati in tempi diversi. Life is Strange racconta le gesta di Max Caulfield, una studentessa diciottenne, che scopre di possedere il potere di riavvolgere il tempo quando salva la sua amica d infanzia, Chloe Price, dall essere uccisa.',
        year: 2015
    })

    await repository.save({
        name: "Remember Me",
        description: 'Caratterizza Remember Me un mix di esplorazione, platform, stealth e combattimenti corpo a corpo. Il gioco introduce un meccanismo di memory-remixing: entrare in possesso e riorganizzare i ricordi di un bersaglio manipolandoli.',
        year: 2013
    })

    await repository.save({
        name: "Pokemon Zaffiro",
        description: 'Pokémon Rubino e Zaffiro si svolgono nella regione di Hoenn, situata a una certa distanza dalle regioni di Kanto e Johto presenti nei giochi precedenti. Il design di Hoenn è basato sulla regione di Kyūshū; tuttavia Hoenn è ruotata di 90° rispetto al territorio reale, poiché Junichi Masuda ha ritenuto che avrebbe fornito un migliore equilibrio di gioco. Come Kyūshū, Hoenn possiede molte isole minori e parte della regione è dominata da rotte marittime, molte delle quali contengono aree in cui il giocatore può immergersi sott acqua.',
        year: 2003
    })

    await repository.save({
        name: "Pokemon Alpha Zaffiro",
        description: 'Tuffati nell incredibile avventura di Pokémon Zaffiro Alpha su Nintendo 3DS e 2DS! Scopri una rivisitazione del mondo di Pokémon Versione Zaffiro, lanciato per Game Boy Advance nel 2003. Grazie alla sua grafica rinnovata e ai contenuti completamente inediti, avrai occasione di dimostrare di essere il miglior allenatore di Pokémon della regione, catturando, allenando e facendo lottare i tuoi Pokémon in questo avvincente RPG.',
        year: 2014
    })

    process.exit(0);
})