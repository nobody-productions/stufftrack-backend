# Stufftracker backend
A simple backend to track your stuff.

As long as the integration has been developed, you can track whatever you prefer.

## Getting started
1. Clone this repo
```
    git clone https://github.com/nobody-productions/stufftrack-backend.git && cd stufftrack-backend
```
2. Install NodeJS on your system in your preferred way. Also, make sure to have a fully functional PostgreSQL installation with a working database.
3. Run `npm install`
4. Fill out the `.env.sample` file and rename it `.env`
5. If you plan to do some mockup test, run the seeders.
```bash
npm run <seeder available>:seed;
```
Alternatively, you can replicate the database which has been used in development by simply running:
```bash
npm run populate-vg
```
7. Run the application by running `npm run start`

## Guide to development
### Developing a custom integration
1. **Define your model**: TypeORM (an ORM) has been used to create the database too, so make sure to define your entities and relationships.
It will be easier for you, and you won't spend a lot of time to figure out what's wrong. 
2. **Create your entities in an appropriate folder**. See what's already here. Make sure to eventually define your constraints (e.g. primary key, unique...).
   1. While choosing a prefix for your table, make sure to choose an appropriate prefix. Right now, two letters prefixes are preferred.
3. **Create your seeders**: it is important for testing the database. Just create a file which will be run for testing purpose only. It will create some entries in your database. Make sure everything's correct!
4. **Create your controllers**: controllers are used to chat with user. They'll be used in your routes.
5. **Define your routes**: into `routes.ts`, define your roots. They will call your controllers functions and this is how you will chat with our users.
6. **Test**: this is the most important part, test your route before submitting. A good route should check bad inputs and have a middleware if needed.
   1. In this phase, I highly recommend tools like **Postman**
7. **Launch a PR**: if everything's ready, we can integrate another module. Yay! ✨

## Documentation
See [DOCUMENTATION.ENG.md](DOCUMENTATION.ENG.md) (needs to be translated from italian).

If you're italian, take a look to: [DOCUMENTATION.ENG.md](DOCUMENTATION.ENG.md)

## License
Everything is under AGPL, see LICENSE to learn more.
