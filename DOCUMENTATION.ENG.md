# ITA Documentation

The url to put before all requests is: `/api/v1/`

## Index.
- [Authentication](#authentication)
  - `POST` `/register` `(allows new users to register)`.
  - `POST` `/login` `(allows users to log in)`
  - `POST` `/logout` `(allows users to log out)`
- [Route Basic](#route-basic)
  - `GET` `/profile` `(returns the data of the user logged in at that time)`
  - `GET` `/users/:id` `(given an id as input, returns the data of that specific user)`
  - `PUT` `/users/info` `(modifies the data of the current user)`
  - `PUT` `/users/password` `(changes the password of the current user)`
- [Route Admin](#route-admin)
  - [Video Games Management](#gestione-videogames)
    - `POST` `/videogames` `(inserts a new video game within the internal db)`
    - `PUT` `/videogames/:id` `(modifies the data of a video game within the internal db)`
    - `DELETE` `/videogames/:id` `(delete a video game from the internal db)`
  - [Remake Management](#gestion-remake)
    - `POST` `/videogames/:id/remake` `(adds a remake into the internal db)`
    - `DELETE` `/videogames/:id/remake` `(removes a remake from the internal db)`
  - [Platform Management](#gestione-platforms)
    - `POST` `/videogames/platforms` `(adds a platform in the internal db`
    - `DELETE` `/videogames/platforms/:id` `(removes a platform from the internal db)`
- [User Route](#route-user)
  - [Videogames-general](#videogames-general)
    - `GET` `/videogames/` `(returns all video games in the internal db)`
    - `GET` `/videogames/:id/remake` `(returns all remakes of a certain video game)`
    - `GET` `/videogames/platforms` `(returns all platforms in the db in ascending order)`
    - `GET` `/videogames/platforms/:id/` `(returns a specific platform)`
  - [Video games - library](#videogames-general).
    - `GET` `/libraries/videogames/` `(returns all video games in the user's library)`
    - `POST` `/libraries/videogames/:id` `(inserts a video game into the user's library)`
    - `GET` `/libraries/videogames/:id` `(returns a video game to the user's library)`
    - `PUT` `/libraries/videogames/:id` `(modifies the details of a video game in the user's library)`
    - `DELETE` `/libraries/videogames/:id` `(removes a video game from the user's library)`
  - [Video games-rating (ratings)](#videogames-rating-ratings)
    - `GET` `/libraries/videogames/:id/rating` `(returns a rating of a video game in the user's library)`
    - `POST` `/libraries/videogames/:id/rating` `(adds a rating of a video game in the user's library)`
    - `PUT` `/libraries/videogames/:id/rating` `(modifies the details of a video game rating in the user's library)`
    - `DELETE` `/libraries/videogames/:id/rating` `(removes a rating of a video game from the user's library)`
  - [Video games-statistics](#videogames-statistics).
    - `GET` `/libraries/videogames/charts/completed` `(returns the number of games 'completed' by the logged-in user)`
    - `GET` `/libraries/videogames/charts/finished` `(returns the number of games 'finished' by the logged-in user)`
    - `GET` `/libraries/videogames/charts/to-play` `(returns the number of games 'to be played' by the logged-in user)`
    - `GET` `/libraries/videogames/charts/abandoned` `(returns the number of games 'abandoned' by the logged-in user)`
    - `GET` `/libraries/videogames/charts/now-playing` `(returns the number of games 'in progress' by the logged-in user)`
    - `GET` `/libraries/videogames/charts/completed-and-finished` `(returns the number of games 'completed' and 'finished' by the logged-in user)`
    - `GET` `/libraries/videogames/charts/total` `(returns the total number of games in the logged-in user's library excluding those 'to be played')`
    - `GET` `/libraries/videogames/charts/top-20` `(returns the twenty games in the logged-in user's library that have the highest score)`
    - `GET` `/libraries/videogames/charts/top-platform` `(returns the platform where the user finished the most games)`
    - `GET` `/libraries/videogames/charts/most-used-platform` `(returns the platform where the user entered the most games, excluding 'to play' games)`
    - `GET` `/libraries/videogames/charts/total-bought` `(returns the number of games purchased by the user)`
    - `GET` `/libraries/videogames/charts/total-hours` `(returns the user's total hours played)`
----------------------------------

## Libri
For books, you just need to replace "books" instead of "videogames".

The API works in the same way.
