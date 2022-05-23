import {createConnections, getManager} from "typeorm";
import {Author} from "../../entity/book/author.entity";

createConnections().then(async () => {
    const repository = getManager().getRepository(Author);

    await repository.save({
        name: "Stephen",
        surname: "King",
        nickname: "Stephen King",
        country: "USA"
    })
    await repository.save({
        name: "J.K",
        surname: "Rowling",
        nickname: "J.K. Rowling",
        country: "UK"
    })
    await repository.save({
        name: "George",
        surname: "Orwell",
        nickname: "George Orwell",
        country: "UK"
    })
    await repository.save({
        name: "J.R.R",
        surname: "Tolkien",
        nickname: "J.R.R. Tolkien",
        country: "UK"
    })
    await repository.save({
        name: "Douglas",
        surname: "Adams",
        nickname: "Douglas Adams",
        country: "USA"
    })
    await repository.save({
        name: "Glenn",
        surname: "Cooper",
        nickname: "Glenn Cooper",
        country: "USA"
    })
    await repository.save({
        name: "Sir",
        surname: "Arthur Conan Doyle",
        nickname: "Sir Arthur Conan Doyle",
        country: "USA"
    })
    await repository.save({
        name: "Agatha",
        surname: "Christie",
        nickname: "Agatha Christie",
        country: "UK"
    })
    await repository.save({
        name: "Lewis",
        surname: "Carroll",
        nickname: "Lewis Carroll",
        country: "UK"
    })
    await repository.save({
        name: "Charles",
        surname: "Baudelaire",
        nickname: "Charles Baudelaire",
        country: "France"
    })
    process.exit(0);
})