import { Router } from "express";
import {Login, Register, Logout, Profile, UpdateInfo, UpdatePassword } from "./controller/auth.controller";
import {AuthMiddleware} from "./middleware/auth.middleware";
import {GetUser} from "./controller/user.controller";
import {
    CreateVideogame,
    DeleteVideogame,
    GetVideogame,
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
import {CreateRemake, DeleteRemake, GetRemake} from "./controller/videogames/remake.controller";
import {PermissionMiddleware} from "./middleware/permission.middleware";
import {CheckIdParamMiddleware} from "./middleware/checkidparam.middleware";
import {
    TotalAbandonedGames,
    TotalCompletedAndFinishedGames,
    TotalCompletedGames,
    TotalFinishedGames,
    TotalNowPlayingGames,
    TotalToPlayGames,
    MostUsedPlatform,
    Top20VideogamesEver,
    TopPlatform,
    TotalBought,
    TotalVideogamesEver, TotalHours,
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
    router.put("/api/v1/videogames/:id", AuthMiddleware, PermissionMiddleware('videogames'), CheckIdParamMiddleware, UpdateVideogame)
    router.delete("/api/v1/videogames/:id", AuthMiddleware, PermissionMiddleware('videogames'), CheckIdParamMiddleware, DeleteVideogame)

    router.get("/api/v1/videogames/:id/remake", AuthMiddleware, PermissionMiddleware('videogames'), CheckIdParamMiddleware, GetRemake)
    router.post("/api/v1/videogames/:id/remake", AuthMiddleware, PermissionMiddleware('videogames'), CheckIdParamMiddleware, CreateRemake)
    router.delete("/api/v1/videogames/:id/remake", AuthMiddleware, PermissionMiddleware('videogames'), CheckIdParamMiddleware, DeleteRemake)

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
        - get the rating of a specific videogame in user library
        - add / edit / remove the rating of a specific videogame in user library

        VIDEOGAMES INTEGRATION - CHARTS
        - total number of completed, finished, 'to play', abandoned, now playing, completed and finished games
        - total number of games in user library
        - top 20 videogames ever: videogames with the highest ranking in user library
        - top platform: where user has finished most games
        - most used platform: where user has done anything (but 'to play')
        - total bought: the number of bought games by the user
        - total hours: the number of total hours the user spent while gaming

    */
    router.get("/api/v1/videogames", AuthMiddleware, Videogames)
    router.get('/api/v1/videogames/:id/remakes', AuthMiddleware, CheckIdParamMiddleware, GetVideogameRemake)
    router.get("/api/v1/videogames/platforms", AuthMiddleware, Platforms)
    router.get("/api/v1/videogames/platforms/:id", AuthMiddleware, CheckIdParamMiddleware, GetPlatform)

    router.get('/api/v1/libraries/videogames', AuthMiddleware, VideogameUserLibrary)
    router.get('/api/v1/videogames/:id', AuthMiddleware, CheckIdParamMiddleware, GetVideogame)
    router.get('/api/v1/libraries/videogames/:id', AuthMiddleware, CheckIdParamMiddleware, GetVideogameUserLibrary)
    router.post('/api/v1/libraries/videogames/:id', AuthMiddleware, CheckIdParamMiddleware, CreateVideogameUserLibrary)
    router.put('/api/v1/libraries/videogames/:id', AuthMiddleware, CheckIdParamMiddleware, UpdateVideogameUserLibrary)
    router.delete('/api/v1/libraries/videogames/:id', AuthMiddleware, CheckIdParamMiddleware, DeleteVideogameUserLibrary)

    router.get('/api/v1/libraries/videogames/:id/rating', AuthMiddleware, CheckIdParamMiddleware, GetVideogameUserLibraryRating)
    router.post('/api/v1/libraries/videogames/:id/rating', AuthMiddleware, CheckIdParamMiddleware, CreateVideogameUserLibraryRating)
    router.put('/api/v1/libraries/videogames/:id/rating', AuthMiddleware, CheckIdParamMiddleware, UpdateVideogameUserLibraryRating)
    router.delete('/api/v1/libraries/videogames/:id/rating', AuthMiddleware, CheckIdParamMiddleware, DeleteVideogameUserLibraryRating)

    // all charts refer to the logged user
    router.get('/api/v1/libraries/videogames/charts/completed', AuthMiddleware, TotalCompletedGames)
    router.get('/api/v1/libraries/videogames/charts/finished', AuthMiddleware, TotalFinishedGames)
    router.get('/api/v1/libraries/videogames/charts/to-play', AuthMiddleware, TotalToPlayGames)
    router.get('/api/v1/libraries/videogames/charts/abandoned', AuthMiddleware, TotalAbandonedGames)
    router.get('/api/v1/libraries/videogames/charts/now-playing', AuthMiddleware, TotalNowPlayingGames)
    router.get('/api/v1/libraries/videogames/charts/completed-and-finished', AuthMiddleware, TotalCompletedAndFinishedGames)
    router.get('/api/v1/libraries/videogames/charts/total', AuthMiddleware, TotalVideogamesEver)
    router.get('/api/v1/libraries/videogames/charts/top-20', AuthMiddleware, Top20VideogamesEver)
    router.get('/api/v1/libraries/videogames/charts/top-platform', AuthMiddleware, TopPlatform)
    router.get('/api/v1/libraries/videogames/charts/most-used-platform', AuthMiddleware, MostUsedPlatform)
    router.get('/api/v1/libraries/videogames/charts/total-bought', AuthMiddleware, TotalBought)
    router.get('/api/v1/libraries/videogames/charts/total-hours', AuthMiddleware, TotalHours)
}