require('dotenv').config()

import express, {Request, Response} from 'express';
import cors from 'cors';
import { routes } from './routes';
import { createConnection } from 'typeorm';
import cookieParser from "cookie-parser";
createConnection().then(connection => {
    const app = express();

    // json as return
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({
        credentials: true,      // frontend now can access cookies
        origin: ["http://localhost:8800"]
    }));

    app.use(function(err, req, res, next) {
        res.status(500).send({message: 'oh-oh, something\'s wrong!'});
    });

    routes(app);

    app.listen(8000, () => {
        console.log("Listening to port 8000")
    });
})
