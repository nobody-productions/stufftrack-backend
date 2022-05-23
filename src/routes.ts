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
    MostUsedVideogamePlatform,
    Top20VideogamesEver,
    TopVideogamePlatform,
    TotalVideogamesBought,
    TotalVideogamesEver, TotalVideogamesHours,
} from "./controller/charts/videogame.charts.controller";
import { CreateGuestMessage } from "./controller/guest.message.controller";
import {Books, CreateBook, DeleteBook, GetBook, UpdateBook} from "./controller/book/book.controller";
import {
    BookPlatforms,
    CreateBookPlatform,
    DeleteBookPlatform,
    GetBookPlatform
} from "./controller/book/platform.controller";
import {
    CreateUserLibraryBook, DeleteUserLibraryBook,
    GetUserLibraryBook, UpdateUserLibraryBook,
    UserLibraryBooks
} from "./controller/book/book.user.library.controller";
import {
    CreateUserLibraryBookRating, DeleteUserLibraryBookRating,
    GetUserLibraryBookRating,
    UpdateUserLibraryBookRating
} from "./controller/book/rating.controller";
import {BookStatus} from "./entity/book/book.user.library.entity";
import {
    MostUsedBookPlatform,
    Top20BooksEver, TopBookPlatform,
    TotalAbandonedBooks, TotalBooksBought,
    TotalBooksEver, TotalBooksHours,
    TotalCompletedBooks,
    TotalNowPlayingBooks,
    TotalToPlayBooks
} from "./controller/charts/books.charts.controller";

export const routes = (router: Router) => {
    // external route: guest will use this route
    router.post("/api/v1/send-email", CreateGuestMessage);

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
    router.get('/api/v1/libraries/videogames/charts/top-platform', AuthMiddleware, TopVideogamePlatform)
    router.get('/api/v1/libraries/videogames/charts/most-used-platform', AuthMiddleware, MostUsedVideogamePlatform)
    router.get('/api/v1/libraries/videogames/charts/total-bought', AuthMiddleware, TotalVideogamesBought)
    router.get('/api/v1/libraries/videogames/charts/total-hours', AuthMiddleware, TotalVideogamesHours)

    /* ============================= */
    /*
        ADMIN ROUTES
        - add / edit / remove a book (from the local db)
        - add / remove a book platform
    */

    router.post("/api/v1/books", AuthMiddleware, PermissionMiddleware('books'), CreateBook)
    router.put("/api/v1/books/:id", AuthMiddleware, PermissionMiddleware('books'), CheckIdParamMiddleware, UpdateBook)
    router.delete("/api/v1/books/:id", AuthMiddleware, PermissionMiddleware('books'), CheckIdParamMiddleware, DeleteBook)

    router.post("/api/v1/books/platforms", AuthMiddleware, PermissionMiddleware('books'), CreateBookPlatform)
    router.delete("/api/v1/books/platforms/:id", AuthMiddleware, PermissionMiddleware('books'), DeleteBookPlatform)


    /*
        BOOKS INTEGRATION - GENERAL
        - retrieve all books in db
        - given a book id, get the original and the remake ids
        - retrieve all book platforms in db
        - get a specific platform

        BOOKS INTEGRATION - USER LIBRARY
        - retrieve all books in user library
        - retrieve a specific book in user library
        - add / edit / remove a specific book in user library

        BOOKS INTEGRATION - RATING
        - get the rating of a specific book in user library
        - add / edit / remove the rating of a specific book in user library

        BOOKS INTEGRATION - CHARTS
        - total number of finished, 'to play', abandoned, now reading, books
        - total number of books in user library
        - top 20 books ever: books with the highest ranking in user library
        - top platform: where user has finished most books
        - most used platform: where user has done anything (but 'to play')
        - total bought: the number of bought books by the user
        - total hours: the number of total hours the user spent while reading
    */
    router.get("/api/v1/books", AuthMiddleware, Books)
    router.get("/api/v1/books/platforms", AuthMiddleware, BookPlatforms)
    router.get("/api/v1/books/platforms/:id", AuthMiddleware, CheckIdParamMiddleware, GetBookPlatform)

    router.get('/api/v1/libraries/books', AuthMiddleware, UserLibraryBooks)
    router.get('/api/v1/books/:id', AuthMiddleware, CheckIdParamMiddleware, GetBook)
    router.get('/api/v1/libraries/books/:id', AuthMiddleware, CheckIdParamMiddleware, GetUserLibraryBook)
    router.post('/api/v1/libraries/books/:id', AuthMiddleware, CheckIdParamMiddleware, CreateUserLibraryBook)
    router.put('/api/v1/libraries/books/:id', AuthMiddleware, CheckIdParamMiddleware, UpdateUserLibraryBook)
    router.delete('/api/v1/libraries/books/:id', AuthMiddleware, CheckIdParamMiddleware, DeleteUserLibraryBook)

    router.get('/api/v1/libraries/books/:id/rating', AuthMiddleware, CheckIdParamMiddleware, GetUserLibraryBookRating)
    router.post('/api/v1/libraries/books/:id/rating', AuthMiddleware, CheckIdParamMiddleware, CreateUserLibraryBookRating)
    router.put('/api/v1/libraries/books/:id/rating', AuthMiddleware, CheckIdParamMiddleware, UpdateUserLibraryBookRating)
    router.delete('/api/v1/libraries/books/:id/rating', AuthMiddleware, CheckIdParamMiddleware, DeleteUserLibraryBookRating)

    // all charts refer to the logged user
    router.get('/api/v1/libraries/books/charts/completed', AuthMiddleware, TotalCompletedBooks)
    router.get('/api/v1/libraries/books/charts/to-read', AuthMiddleware, TotalToPlayBooks)
    router.get('/api/v1/libraries/books/charts/abandoned', AuthMiddleware, TotalAbandonedBooks)
    router.get('/api/v1/libraries/books/charts/now-reading', AuthMiddleware, TotalNowPlayingBooks)
    router.get('/api/v1/libraries/books/charts/total', AuthMiddleware, TotalBooksEver)
    router.get('/api/v1/libraries/books/charts/top-20', AuthMiddleware, Top20BooksEver)
    router.get('/api/v1/libraries/books/charts/top-platform', AuthMiddleware, TopBookPlatform)
    router.get('/api/v1/libraries/books/charts/most-used-platform', AuthMiddleware, MostUsedBookPlatform)
    router.get('/api/v1/libraries/books/charts/total-bought', AuthMiddleware, TotalBooksBought)
    router.get('/api/v1/libraries/books/charts/total-hours', AuthMiddleware, TotalBooksHours)
}
