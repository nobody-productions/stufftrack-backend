import { Request, Response } from "express"
import { getManager } from "typeorm";
import {RegisterValidation} from "../validation/register.validation"
import { User } from "../entity/user.entity";
import bcryptjs from "bcryptjs";
import {sign, verify} from "jsonwebtoken";

// route: registrazione nuovo utente (lato utente)
export const Register = async (req: Request, res: Response) => {
    const body = req.body;

    // validation.error so giá che esiste, posso usare questa sintassi

    // chk: errori in input
    const {error} = RegisterValidation.validate(body);
    if(error) {
        return res.status(400).send(error.details);
    }

    // chk: password uguali
    if (body.password !== body.password_confirm) {
        return res.status(400).send({message: "password's do not match"});
    }

    const repository = getManager().getRepository(User);

    const {password, ...user} = await repository.save({
        email: body.email,
        password: await bcryptjs.hash(body.password, 10),
        nickname: body.nickname || "",
        propic: body.propic || "",   // @TODO: dare la possibilitá di uploadare una foto all'utente
        bio: body.bio || "",
        active: true,       // @TODO: quando verrá implementato per bene, cambiarlo a false. Un utente diventa true SSE viene cliccata la mail di conferma.
        role: body.id       // TODO: rivedere questo.

        }
    );

    res.send(user);
}


// autenticazione base: login logout
export const Login = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(User);

    // chk: mail non vuota
    if(!req.body.email) {
        return res.status(404).send({
            //message: 'Email is empty!'
            message: 'Invalid credentials!'
        })
    }

    // chk: mail non esistente
    const user = await repository.findOne({where:
            {email: req.body.email}});
    if(!user) {
        return res.status(404).send({
            //message: 'User not found!'
            message: 'Invalid credentials!'
        })
    }

    // chk: pwd non corretta
    if(!await bcryptjs.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'Invalid credentials!'
        })
    }

    // parte per JWT
    const payload = {
        id: user.id
    }
    const token = sign(payload, process.env.SECRET_KEY);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    res.send({
        message: 'success'
    });
}

export const Logout = async (req: Request, res: Response) => {
    res.cookie('jwt', '', {maxAge: 0});
    res.send({
        message: 'Success'
    })
}

// route: profilo
export const Profile = async (req: Request, res: Response) => {
    const jwt = req.cookies['jwt'];
    const payload: any = verify(jwt, "secret");

    if (!payload) {
        return res.status(401).send({
            message: "unauthenticated"
        });
    }

    const repository = getManager().getRepository(User);

    const {password, ...user} = await repository.findOne({where: payload.id});
    res.send(user)
}
