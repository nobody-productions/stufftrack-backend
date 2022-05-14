import { Router } from "express";
import {Login, Register, Logout, Profile, UpdateInfo, UpdatePassword } from "./controller/auth.controller";
import {AuthMiddleware} from "./middleware/auth.middleware";
import {GetVideogameRemake, Videogames} from "./controller/videogames/videogame.controller";
import {GetUser} from "./controller/user.controller";
import {
    CreateVideogameUserLibrary, DeleteVideogameUserLibrary,
    GetVideogameUserLibrary, UpdateVideogameUserLibrary,
    VideogameUserLibrary
} from "./controller/videogames/videogame.user.library.controller";
import {GetPlatform, Platforms} from "./controller/videogames/platform.controller";

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
    router.get("/api/v1/videogames", AuthMiddleware, Videogames)    // get all videogames in db
    router.get('/api/v1/videogames/:id/remake', AuthMiddleware, GetVideogameRemake) // given a videogame id, get the original and the remake ids
    router.get("/api/v1/videogames/platforms", AuthMiddleware, Platforms)   // get all platforms in db
    router.get("/api/v1/videogames/platforms/:id", AuthMiddleware, GetPlatform) // get a specific platform in db

    // user library
    router.get('/api/v1/libraries/videogames', AuthMiddleware, VideogameUserLibrary)        // all vgs in userlib
    router.post('/api/v1/libraries/videogames', AuthMiddleware, CreateVideogameUserLibrary) // create a new videogame in userlib
    router.get('/api/v1/libraries/videogames/:id', AuthMiddleware, GetVideogameUserLibrary) // get a specific videogame in userlib, given an id
    router.put('/api/v1/libraries/videogames/:id', AuthMiddleware, UpdateVideogameUserLibrary)
    router.delete('/api/v1/libraries/videogames/:id', AuthMiddleware, DeleteVideogameUserLibrary)



}