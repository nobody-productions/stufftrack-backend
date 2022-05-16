import { Router } from "express";
import {Login, Register, Logout, Profile, UpdateInfo, UpdatePassword } from "./controller/auth.controller";
import {AuthMiddleware} from "./middleware/auth.middleware";
import {GetUser} from "./controller/user.controller";
import {
    CreateVideogame,
    DeleteVideogame,
    GetVideogameRemake, UpdateVideogame,
    Videogames
} from "./controller/videogames/videogame.controller";
import {
    CreateVideogameUserLibrary,
    DeleteVideogameUserLibrary,
    GetVideogameUserLibrary,
    UpdateVideogameUserLibrary,
    VideogameUserLibrary
} from "./controller/videogames/videogame.user.library.controller";
import {CreatePlatform, GetPlatform, Platforms} from "./controller/videogames/platform.controller";
import {
    CreateVideogameUserLibraryRating, DeleteVideogameUserLibraryRating,
    GetVideogameUserLibraryRating, UpdateVideogameUserLibraryRating
} from "./controller/videogames/rating.controller";
import {CreateRemake, DeleteRemake} from "./controller/videogames/remake.controller";

export const routes = (router: Router) => {
    /*
        BASIC ROUTES
        - login, logout, register
        - profile info
        - view a specific user profile, knowing his id -> all users are public as long as you log in
        - update user info and user
     */
    router.post("/api/v1/register", Register)
    router.post("/api/v1/login", Login)
    router.post("/api/v1/logout", Logout)
    router.get("/api/v1/profile", AuthMiddleware, Profile)
    router.get("/api/v1/users/:id", AuthMiddleware, GetUser)
    router.put("/api/v1/users/info", AuthMiddleware, UpdateInfo)
    router.put("/api/v1/users/password", AuthMiddleware, UpdatePassword)

    /*
        ADMIN ROUTES
        - add / edit / remove a videogame (from the local db)
        - add / remove a remake (knowing first the videogames that needs to be linked each other)
        - add / remove a platform
     */
    router.post("/api/v1/videogames", AuthMiddleware, CreateVideogame)
    router.put("/api/v1/videogames/:id", AuthMiddleware, UpdateVideogame)
    router.delete("/api/v1/videogames/:id", AuthMiddleware, DeleteVideogame)

    router.post("/api/v1/videogames/:id/remake", AuthMiddleware, CreateRemake)
    router.delete("/api/v1/videogames/:id/remake", AuthMiddleware, DeleteRemake)

    router.post("/api/v1/videogames/platforms", AuthMiddleware, CreatePlatform)

    /*
        VIDEOGAMES INTEGRATION - GENERAL
        - retrieve all videogames in db
        - given a videogame id, get the original and the remake ids
        - retrieve all platforms in db
        - get a specific platform

        VIDEOGAMES INTEGRATION - USER LIBRARY
        - retrieve all videogames in user library
        - retrieve a specific videogame in user library
        - add / edit / remove a specific game in user library

        VIDEOGAMES INTEGRATION - RATING
        - get the rating of a specific videogame in userlib
        - add / edit / remove the rating of a specific videogame in userlib
    */
    router.get("/api/v1/videogames", AuthMiddleware, Videogames)
    router.get('/api/v1/videogames/:id/remakes', AuthMiddleware, GetVideogameRemake)
    router.get("/api/v1/videogames/platforms", AuthMiddleware, Platforms)
    router.get("/api/v1/videogames/platforms/:id", AuthMiddleware, GetPlatform)

    router.get('/api/v1/libraries/videogames', AuthMiddleware, VideogameUserLibrary)
    router.post('/api/v1/libraries/videogames', AuthMiddleware, CreateVideogameUserLibrary)
    router.get('/api/v1/libraries/videogames/:id', AuthMiddleware, GetVideogameUserLibrary)
    router.put('/api/v1/libraries/videogames/:id', AuthMiddleware, UpdateVideogameUserLibrary)
    router.delete('/api/v1/libraries/videogames/:id', AuthMiddleware, DeleteVideogameUserLibrary)

    router.get('/api/v1/libraries/videogames/:id/rating', AuthMiddleware, GetVideogameUserLibraryRating)
    router.post('/api/v1/libraries/videogames/:id/rating', AuthMiddleware, CreateVideogameUserLibraryRating)
    router.put('/api/v1/libraries/videogames/:id/rating', AuthMiddleware, UpdateVideogameUserLibraryRating)
    router.delete('/api/v1/libraries/videogames/:id/rating', AuthMiddleware, DeleteVideogameUserLibraryRating)



}