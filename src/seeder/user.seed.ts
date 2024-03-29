import {createConnections, getManager} from "typeorm";
import bcryptjs from "bcryptjs";
import {User} from "../entity/user.entity";
import {Role} from "../entity/role.entity";

createConnections().then(async () => {
    const roleRepository = getManager().getRepository(Role)
    const userRole = await roleRepository.findOne({where: {id: 2}})
    const adminRole = await roleRepository.findOne({where: {id: 1}})

    const repository = getManager().getRepository(User);

    await repository.save({
        email: "damiano@gmail.com",
        password: await bcryptjs.hash('BackendistaSenzaSosta11', 10),
        nickname: "dag7",
        propic: "/profilepictures/default.png",
        bio: "Mi piacciono i videogiochi ma odio Toad di Mario Kart. Firma anche tu la petizione per eliminarlo dal gioco: change.org/eliminiamo-toad-da-mario-kart/",
        active: true,
        role: adminRole
    })

    await repository.save({
        email: "lorenzo@gmail.com",
        password: await bcryptjs.hash('TelefoniChePassione!', 10),
        nickname: "Lollo",
        propic: "/profilepictures/default.png",
        bio: "Mi piace testare i giochi su diversi dispositivi Android, i Mediatek fanno schifo!",
        active: true,
        role: adminRole
    })

    await repository.save({
        email: "misterkrub@gmail.com",
        password: await bcryptjs.hash('INeedADollar$!', 10),
        nickname: "Krubby Krubbone",
        propic: "/profilepictures/default.png",
        bio: "Ciao, mi piacciono i soldi.",
        active: true,
        role: userRole
    })

    await repository.save({
        email: "spongebob@gmail.com",
        password: await bcryptjs.hash('Gary4832930382749274', 10),
        nickname: "Spongy",
        propic: "/profilepictures/default.png",
        bio: "Adoro dare da mangiare a Gary, la mia lumachina. I miei giochi preferiti sono i platform!",
        active: true,
        role: userRole
    })

    await repository.save({
        email: "patrickstella@gmail.com",
        password: await bcryptjs.hash('Blargh', 10),
        nickname: "Patrick Non Stella",
        propic: "/profilepictures/default.png",
        bio: "WADJIOA3FN9W3FJ390FJ90FJWIEFSKJFS EFJSIEOJF8FJ 3WJF3I FWIOJFIWOEJF W39F93W 0F CIAO",
        active: true,
        role: userRole
    })

    await repository.save({
        email: "squidditentacolo@gmail.com",
        password: await bcryptjs.hash('Clarinetto63', 10),
        nickname: "Mastro Squiddi",
        propic: "/profilepictures/default.png",
        bio: "Quando non suono il clarinetto, sono il campione mondiale di Osu. Gioco solo a giochi musicali.",
        active: true,
        role: userRole
    })

    await repository.save({
        email: "theshadow2030@gmail.com",
        password: await bcryptjs.hash('SplatoonIsMyLife', 10),
        nickname: "TheShadow2030",
        propic: "/profilepictures/default.png",
        bio: "Sono una persona temuta e rispettata su Splatoon, ma adoro i gdr o i giochi come God of War.",
        active: true,
        role: userRole
    })

    process.exit(0);
})