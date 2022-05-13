import { Router } from "express";
import {Login, Register, Logout, Profile, UpdateInfo, UpdatePassword } from "./controller/auth.controller";
import {AuthMiddleware} from "./middleware/auth.middleware";
import {Videogames} from "./controller/videogames/videogame.controller";
import {GetUser} from "./controller/user.controller";
import {
    CreateVideogameUserLibrary,
    GetVideogameUserLibrary,
    VideogameUserLibrary
} from "./controller/videogames/videogame.user.library.controller";

export const routes = (router: Router) => {
    // auth routes
    router.post("/api/v1/register", Register)
    router.post("/api/v1/login", Login)
    router.post("/api/v1/logout", Logout)
    router.get("/api/v1/profile", AuthMiddleware, Profile)
    router.put("/api/v1/users/info", AuthMiddleware, UpdateInfo)
    router.put("/api/v1/users/password", AuthMiddleware, UpdatePassword)

    // user routes
    router.get("/api/v1/users/:id", AuthMiddleware, GetUser)

    // videogames
    router.get("/api/v1/videogames", AuthMiddleware, Videogames)

    // user videogames
    router.get('/api/v1/libraries/videogames', AuthMiddleware, VideogameUserLibrary)
    router.get('/api/v1/libraries/videogames/:id', AuthMiddleware, GetVideogameUserLibrary)
    router.post('/api/v1/libraries/videogames', AuthMiddleware, CreateVideogameUserLibrary)

}