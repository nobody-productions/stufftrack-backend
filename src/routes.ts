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
import {CreatePlatform, DeletePlatform, GetPlatform, Platforms} from "./controller/videogames/platform.controller";
import {
    CreateVideogameUserLibraryRating, DeleteVideogameUserLibraryRating,
    GetVideogameUserLibraryRating, UpdateVideogameUserLibraryRating
} from "./controller/videogames/rating.controller";
import {CreateRemake, DeleteRemake} from "./controller/videogames/remake.controller";
import {PermissionMiddleware} from "./middleware/permission.middleware";
import {CheckIdParamMiddleware} from "./middleware/checkidparam.middleware";
import {
    GetNumberAbandonedGames,
    GetNumberCompletedAndFinishedGames,
    GetNumberCompletedGames,
    GetNumberFinishedGames,
    GetNumberNowPlayingGames,
    GetNumberToPlayGames,
    MostUsedPlatform,
    Top20VideogamesEver,
    TopPlatform,
    TotalBought,
    TotalVideogamesEver,
} from "./controller/charts/videogame.charts.controller";

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
    router.post("/api/v1/videogames", AuthMiddleware, PermissionMiddleware('videogames'), CreateVideogame)
    router.put("/api/v1/videogames/:id", AuthMiddleware, PermissionMiddleware('videogames'), UpdateVideogame)
    router.delete("/api/v1/videogames/:id", AuthMiddleware, PermissionMiddleware('videogames'), DeleteVideogame)

    router.post("/api/v1/videogames/:id/remake", AuthMiddleware, PermissionMiddleware('videogames'), CreateRemake)
    router.delete("/api/v1/videogames/:id/remake", AuthMiddleware, PermissionMiddleware('videogames'), DeleteRemake)

    router.post("/api/v1/videogames/platforms", AuthMiddleware, PermissionMiddleware('videogames'), CreatePlatform)
    router.delete("/api/v1/videogames/platforms/:id", AuthMiddleware, PermissionMiddleware('videogames'), DeletePlatform)

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

        VIDEOGAMES INTEGRATION - CHARTS
        - based on a number, it return
    */
    router.get("/api/v1/videogames", AuthMiddleware, Videogames)
    router.get('/api/v1/videogames/:id/remakes', AuthMiddleware, CheckIdParamMiddleware, GetVideogameRemake)
    router.get("/api/v1/videogames/platforms", AuthMiddleware, Platforms)
    router.get("/api/v1/videogames/platforms/:id", AuthMiddleware, CheckIdParamMiddleware, GetPlatform)

    router.get('/api/v1/libraries/videogames', AuthMiddleware, VideogameUserLibrary)
    router.get('/api/v1/libraries/videogames/:id', AuthMiddleware, CheckIdParamMiddleware, GetVideogameUserLibrary)
    router.post('/api/v1/libraries/videogames/:id', AuthMiddleware, CheckIdParamMiddleware, CreateVideogameUserLibrary)
    router.put('/api/v1/libraries/videogames/:id', AuthMiddleware, CheckIdParamMiddleware, UpdateVideogameUserLibrary)
    router.delete('/api/v1/libraries/videogames/:id', AuthMiddleware, CheckIdParamMiddleware, DeleteVideogameUserLibrary)

    router.get('/api/v1/libraries/videogames/:id/rating', AuthMiddleware, CheckIdParamMiddleware, GetVideogameUserLibraryRating)
    router.post('/api/v1/libraries/videogames/:id/rating', AuthMiddleware, CheckIdParamMiddleware, CreateVideogameUserLibraryRating)
    router.put('/api/v1/libraries/videogames/:id/rating', AuthMiddleware, CheckIdParamMiddleware, UpdateVideogameUserLibraryRating)
    router.delete('/api/v1/libraries/videogames/:id/rating', AuthMiddleware, CheckIdParamMiddleware, DeleteVideogameUserLibraryRating)

    // all charts refer to the logged user
    router.get('/api/v1/libraries/videogames/charts/completed', AuthMiddleware, GetNumberCompletedGames)
    router.get('/api/v1/libraries/videogames/charts/finished', AuthMiddleware, GetNumberFinishedGames)
    router.get('/api/v1/libraries/videogames/charts/to-play', AuthMiddleware, GetNumberToPlayGames)
    router.get('/api/v1/libraries/videogames/charts/abandoned', AuthMiddleware, GetNumberAbandonedGames)
    router.get('/api/v1/libraries/videogames/charts/now-playing', AuthMiddleware, GetNumberNowPlayingGames)
    router.get('/api/v1/libraries/videogames/charts/completed-and-finished', AuthMiddleware, GetNumberCompletedAndFinishedGames)
    router.get('/api/v1/libraries/videogames/charts/total', AuthMiddleware, TotalVideogamesEver)
    router.get('/api/v1/libraries/videogames/charts/top-20', AuthMiddleware, Top20VideogamesEver)
    router.get('/api/v1/libraries/videogames/charts/top-platform', AuthMiddleware, TopPlatform)
    router.get('/api/v1/libraries/videogames/charts/most-used-platform', AuthMiddleware, MostUsedPlatform)
    router.get('/api/v1/libraries/videogames/charts/total-bought', AuthMiddleware, TotalBought)

}