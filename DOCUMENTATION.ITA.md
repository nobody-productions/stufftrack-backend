# Documentazione ITA

L'url da anteporre prima di tutte le richieste é: `/api/v1/`

## Indice
- [Autenticazione](#autenticazione)
  - `POST` `/register` `(permette ai nuovi utenti di registrarsi)`
  - `POST` `/login` `(permette agli utenti di loggarsi)`
  - `POST` `/logout` `(permette agli utenti di fare log out)`
- [Route Basic](#route-basic)
  - `GET` `/profile` `(ritorna i dati dell'utente loggato in quel momento)`
  - `GET` `/users/:id` `(dato un id in input, ritorna i dati di quell'utente specifico)`
  - `PUT` `/users/info` `(modifica i dati dell'utente corrente)`
  - `PUT` `/users/password` `(modifica la password dell'utente corrente)`
- [Route Admin](#route-admin)
  - [Gestione Videogiochi](#gestione-videogiochi)
    - `POST` `/videogames` `(inserisce un nuovo videogioco all'interno del db interno)`
    - `PUT` `/videogames/:id` `(modifica i dati di un videogioco all'interno del db interno)`
    - `DELETE` `/videogames/:id` `(cancella un videogioco dal db interno)`
  - [Gestione Remake](#gestione-remake)
    - `POST` `/videogames/:id/remake` `(aggiunge un remake nel db interno)`
    - `DELETE` `/videogames/:id/remake` `(rimuove un remake dal db interno)`
  - [Gestione Piattaforme](#gestione-piattaforme)
    - `POST` `/videogames/platforms` `(aggiunge una piattaforma nel db interno`
    - `DELETE` `/videogames/platforms/:id` `(rimuove una piattaforma dal db interno)`
- [Route Utente](#route-utente)
  - [Videogiochi - generali](#videogiochi-generali)
    - `GET` `/videogames/` `(ritorna tutti i videogiochi presenti nel db interno)`
    - `GET` `/videogames/:id/remake` `(ritorna tutti i remake di un certo videogioco)`
    - `GET` `/videogames/platforms` `(ritorna tutte le piattaforme nel db in ordine ascendente)`
    - `GET` `/videogames/platforms/:id/` `(ritorna una specifica piattaforma)`
  - [Videogiochi - libreria](#videogiochi-generali)
    - `GET` `/libraries/videogames/` `(ritorna tutti i videogiochi presenti nella libreria dell'utente)`
    - `POST` `/libraries/videogames/:id` `(inserisce un videogioco nella libreria dell'utente)`
    - `GET` `/libraries/videogames/:id` `(ritorna un videogioco nella libreria dell'utente)`
    - `PUT` `/libraries/videogames/:id` `(modifica i dettagli di un videogioco nella libreria dell'utente)`
    - `DELETE` `/libraries/videogames/:id` `(rimuove un videogioco dalla libreria dell'utente)`
  - [Videogiochi - rating (valutazioni)](#videogiochi-rating-valutazioni)
    - `GET` `/libraries/videogames/:id/rating` `(ritorna una valutazione di un videogioco nella libreria dell'utente)`
    - `POST` `/libraries/videogames/:id/rating` `(aggiunge una valutazione di un videogioco nella libreria dell'utente)`
    - `PUT` `/libraries/videogames/:id/rating` `(modifica i dettagli di una valutazione di un videogioco nella libreria dell'utente)`
    - `DELETE` `/libraries/videogames/:id/rating` `(rimuove una valutazione di un videogioco dalla libreria dell'utente)`
  - [Videogiochi - statistiche](#videogiochi-statistiche)
    - `GET` `/libraries/videogames/charts/completed` `(restituisce il numero di giochi 'completati' dall'utente loggato)`
    - `GET` `/libraries/videogames/charts/finished` `(restituisce il numero di giochi 'finiti' dall'utente loggato)`
    - `GET` `/libraries/videogames/charts/to-play` `(restituisce il numero di giochi 'da giocare' dall'utente loggato)`
    - `GET` `/libraries/videogames/charts/abandoned` `(restituisce il numero di giochi 'abbandonati' dall'utente loggato)`
    - `GET` `/libraries/videogames/charts/now-playing` `(restituisce il numero di giochi 'in corso' dall'utente loggato)`
    - `GET` `/libraries/videogames/charts/completed-and-finished` `(restituisce il numero di giochi 'completati' e 'finiti' dall'utente loggato)`
    - `GET` `/libraries/videogames/charts/total` `(restituisce il numero totale di giochi nella libreria dell'utente loggato esclusi quelli 'da giocare')`
    - `GET` `/libraries/videogames/charts/top-20` `(restituisce i venti giochi nella libreria dell'utente loggato che hanno il punteggio piu alto)`
    - `GET` `/libraries/videogames/charts/top-platform` `(restituisce la piattaforma dove l'utente ha finito piu giochi)`
    - `GET` `/libraries/videogames/charts/most-used-platform` `(restituisce la piattaforma dove l'utente ha inserito piu giochi, esclusi quelli 'da giocare')`
    - `GET` `/libraries/videogames/charts/total-bought` `(restituisce il numero di giochi acquistati dall'utente)`
----------------------------------
### Autenticazione
<details>
 <summary><code>POST</code> <code>/register</code> <code>(permette ai nuovi utenti di registrarsi)</code></summary>

##### Parametri (body)

> | nome      | tipo    | obbligatorio             | descrizione           |
> | -----------|---------|--------------------------|-----------------------| 
> | email     | email   | si                       | Email dell'utente     |
> | password  | stringa | si |  Password dell'utente |
> | password_confirm | stringa | si |  Deve essere uguale al campo password |
> | nickname      | stringa | no |  Come l'utente preferisce essere chiamato |
> | propic      | stringa | no |  Il percorso dove l'utente ha uploadato l'immagine |
> | bio      | testo | no |  Breve descrizione dell'utente |

##### Codici di risposta

> | nome      | messaggio           |
> | --------- | ------- |
> | 200       | success             |
> | 400 | password's do not match |
> | 400 | errori specifici sull'input |

</details>

<details>
 <summary><code>POST</code> <code>/login</code> <code>(permette agli utenti di loggarsi)</code></summary>

##### Parametri (body)

> | nome      | tipo    | obbligatorio             | descrizione           |
> |---------|--------------------------|-----------------------| --- |
> | email      | email   | si                       | Email dell'utente     |
> | password      | stringa | si |  Password dell'utente |


##### Codici di risposta

> | nome      | messaggio           |
> | --------- | ------- |
> | 200       | success             |
> | 400       | invalid credentials |
> | 404       | invalid credentials |

</details>

<details>
 <summary><code>POST</code> <code>/logout</code> <code>(permette agli utenti di fare log out)</code></summary>

##### Parametri (body)

> | nome      | tipo    | obbligatorio             | descrizione           |
> |---------|--------------------------|-----------------------| ----------------------------------------------------------|
> | nessuno | - | - | - |


##### Codici di risposta

> | nome      | messaggio           |
> | --------- | ------- |
> | 200       | success             |

</details>

> Queste sono le uniche tre route accessibili da chiunque. Per tutte le altre occorre essere loggato.

------------------------------------------------------------------------------------------
### Route basic

<details>
 <summary><code>GET</code> <code>/profile</code> <code>(ritorna i dati dell'utente loggato in quel momento)</code></summary>

##### Parametri (body)

> | nome      | tipo    | obbligatorio             | descrizione           |
> | -----------|---------|--------------------------|----------------------- |
> | nessuno | - | - | - |

##### Codici di risposta

> | nome      | messaggio                                                                                           |
> |-----------------------------------------------------------------------------------------------------| ------- |
> | 200       | json contenente i seguenti campi: id, email, nickname, propic, bio, ruoli che ha quel particolare utente |

</details>

<details>
 <summary><code>GET</code> <code>/users/:id</code> <code>(dato un id in input, ritorna i dati di quell'utente specifico)</code></summary>
    Il funzionamento é identico a `/profile`
</details>

<details>
 <summary><code>PUT</code> <code>/users/info</code> <code>(modifica i dati dell'utente corrente)</code></summary>

##### Parametri (body)

> | nome      | tipo    | obbligatorio             | descrizione           |
> | -----------|---------|--------------------------|-----------------------|
> | email | email | no | nuova email |
> | nickname | stringa | no | nuovo nickname |
> | propic | stringa | no | nuova immagine del profilo |
> | bio | stringa | no | nuova bio |



##### Codici di risposta

> | nome      | messaggio                                                                                                           |
> |---------------------------------------------------------------------------------------------------------------------| ------- |
> | 200       | json contenente i seguenti campi aggiornati: id, email, nickname, propic, bio, ruoli che ha quel particolare utente |

</details>

<details>
 <summary><code>PUT</code> <code>/users/password</code> <code>(modifica la password dell'utente corrente)</code></summary>

##### Parametri (body)

> | nome      | tipo    | obbligatorio             | descrizione           |
> | -----------|---------|--------------------------|-----------------------| 
> | password | stringa | si | nuova password |
> | password_confirm | stringa | si | deve essere uguale al campo 'password' |

##### Codici di risposta

> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 200  | json contenente i dati dell'utente corrente: id, email, nickname, propic, bio, ruoli che ha quell'utente |
> | 400  | password's do not match |

</details>

------------------------------------------------------------------------------------------
### Route admin
Queste route possono essere utilizzate solamente dagli admin.

#### Gestione videogiochi

<details>
<summary><code>POST</code> <code>/videogames</code> <code>(inserisce un nuovo videogioco all'interno del db interno)</code></summary>

##### Parametri (body)

> | nome             | tipo              | obbligatorio             | descrizione           |
> |-------------------| ------------------| -----------|---------| 
> | name             | stringa           | si | nome del videogioco |
> | description                | stringa           | si | descrizione |
> | year             | intero            | si | anno di uscita del videogioco |
> | image | stringa           | no | path immagine della cover del videogioco |

##### Codici di risposta

> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 400 | error while saving, make sure you didn't already saved this game and try again |
> | 201 | json contenente i dati del nuovo videogioco appena creato: id, name, description, year, image |
</details>

<details>
<summary><code>PUT</code> <code>/videogames/:id</code> <code>(modifica i dati di un videogioco all'interno del db interno)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | id | intero | si | identificativo del videogioco che si vuole andare a modificare |

##### Parametri (body)

> | nome             | tipo              | obbligatorio             | descrizione           |
> |-------------------| ------------------| -----------|---------| 
> | name             | stringa           | no | nuovo nome del videogioco |
> | description                | stringa           | no | nuova descrizione |
> | year             | intero            | no | nuovo anno di uscita del videogioco |
> | image | stringa           | no | nuovo path immagine della cover del videogioco |

##### Codici di risposta

> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 200 | json contenente i dati del nuovo videogioco aggiornati: id, name, description, year, image |
> | 400 | error while saving, make sure you didn't already saved this game and try again |
</details>

<details>
<summary><code>DELETE</code> <code>/videogames/:id</code> <code>(cancella un videogioco dal db interno)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | id | intero | si | identificativo del videogioco che si vuole andare a eliminare |

##### Parametri (body)

> | nome             | tipo              | obbligatorio             | descrizione           |
> |-------------------| ------------------| -----------|---------| 
> | nessuno | - | - | - |

##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 204 | null |
</details>


##### Gestione remake

Un remake di un videogioco consiste quando il videogioco esce nuovamente su una piattaforma diversa da quella originale.

Nella documentazione, viene definito 'videogioco sorgente' quello uscito cronologicamente prima, e 'videogioco destinazione' quello uscito cronologicamente dopo.

<details>
<summary><code>POST</code> <code>/videogames/:id/remake</code> <code>(aggiunge un remake nel db interno)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | id | intero | si | identificativo del videogioco sorgente  |

##### Parametri (body)

> | nome             | tipo              | obbligatorio             | descrizione           |
> |-------------------| ------------------| -----------|---------| 
> | remake | intero | si | identificativo del videogioco destinazione  |

##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 201 | null |
> | 404 | original videogame doesn't exist | 
> | 404 | videogame remake doesn't exist | 
</details>

<details>
<summary><code>DELETE</code> <code>/videogames/:id/remake</code> <code>(rimuove un remake dal db interno)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | id | intero | si | identificativo del videogioco sorgente  |

##### Parametri (body)

> | nome             | tipo              | obbligatorio             | descrizione           |
> |-------------------| ------------------| -----------|---------| 
> | remake | intero | si | identificativo del videogioco destinazione  |

##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 201 | null |
> | 404 | original videogame doesn't exist | 
> | 404 | videogame remake doesn't exist | 
</details>


##### Gestione piattaforme

<details>
<summary><code>POST</code> <code>/videogames/platforms</code> <code>(aggiunge una piattaforma nel db interno)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |

##### Parametri (body)

> | nome             | tipo              | obbligatorio             | descrizione           |
> |-------------------| ------------------| -----------|---------| 
> | nome             | tipo              | obbligatorio             | descrizione           |
> | name | stringa | si | nome della piattaforma da aggiungere  |
> | codename | stringa | si | nome corto significativo della piattaforma


##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 201 | json contenente name e codename di cio che é appena stato inserito |
</details>

<details>
<summary><code>DELETE</code> <code>/videogames/platforms/:id/</code> <code>(rimuove una piattaforma dal db interno)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | id | intero | si | identificativo della piattaforma  |

##### Parametri (body)

> | nome             | tipo              | obbligatorio             | descrizione           |
> |-------------------| ------------------| -----------|---------| 
> | nessuno | - | - | - |

##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 204 | null |
</details>

------------------------------------------------------------------------------------------
### Route utente
Queste route possono essere utilizzate dagli utenti loggati.

#### Videogiochi - generali

<details>
<summary><code>GET</code> <code>/videogames/</code> <code>(ritorna tutti i videogiochi presenti nel db interno)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |

##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 200 | json contenente 15 videogiochi. La risposta é paginata ed é possibile andare alla pagina successiva semplicemente aggiungendo /?page=xx a fine url.  |

##### Esempi
- localhost:8800/api/v1/videogames/ -> ritorna i primi 15 videogiochi
- localhost:8800/api/v1/videogames/?page=1000 -> ritorna la millesima pagina contenente 15 videogiochi

</details>

<details>
<summary><code>GET</code> <code>/videogames/:id/remake</code> <code>(ritorna tutti i remake di un certo videogioco)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | id | intero | si | identificativo del videogioco del quale vogliamo conoscere i remake  |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |

##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 200 | json contenente i dati dei videogiochi-remake del videogioco sorgente.  |
</details>

<details>
<summary><code>GET</code> <code>/videogames/platforms</code> <code>(ritorna tutte le piattaforme nel db in ordine ascendente)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |

##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 200 | json contenente 15 piattaforme. La risposta é paginata ed é possibile andare alla pagina successiva semplicemente aggiungendo /?page=xx a fine url.  |

##### Esempi
- localhost:8800/api/v1/videogames/platforms/ -> ritorna le prime 15 piattaforme
- localhost:8800/api/v1/videogames/platforms/?page=1000 -> ritorna la millesima pagina contenente 15 piattaforme
</details>

<details>
<summary><code>GET</code> <code>/videogames/platforms/:id/</code> <code>(ritorna una specifica piattaforma)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | id | intero | si | identificativo della piattaforma  |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |

##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 200 | json contenente i dati di una piattaforma: name e codename.  |
</details>

#### Videogiochi - Libreria

<details>
<summary><code>GET</code> <code>/libraries/videogames/</code> <code>(ritorna tutti i videogiochi presenti nella libreria dell'utente)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |

##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 200 | json contenente 15 videogiochi. La risposta é paginata ed é possibile andare alla pagina successiva semplicemente aggiungendo /?page=xx a fine url.  |

##### Esempi
- localhost:8800/api/v1/libraries/videogames/ -> ritorna i primi 15 videogiochi
- localhost:8800/api/v1/libraries/videogames/?page=1000 -> ritorna la millesima pagina contenente 15 videogiochi

</details>

<details>
<summary><code>POST</code> <code>/libraries/videogames/:id</code> <code>(inserisce un videogioco nella libreria dell'utente)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | id | intero | si | identificativo del videogioco che si vuole aggiungere dell'utente  |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | finished | data | no | indica se l'utente ha completato quel gioco o no |
> | hours | intero | no | quante ore ha giocato l'utente |
> | bought | booleano | no | se l'utente ha comprato quel gioco oppure no (default: false) |
> | status | Stato | no | puó assumere i seguenti valori: {Da giocare, Finito, Completato, Abbandonato} (default: 'Da giocare') |
> | platform | intero | si | id della piattaforma sul quale ci ha giocato |

##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 201 | json contenente i dati del nuovo videogioco appena creato: created_at (data creazione), updated_at (ultimo aggiornamento), finished, hours, bought, status, videogame, platform |
> | 400 | error while saving, make sure you didn't already saved this game and try again |
> | 400 | dettagli sul cosa c'é di sbagliato (es. campi malformati) |


</details>

<details>
<summary><code>GET</code> <code>/libraries/videogames/:id</code> <code>(ritorna un videogioco nella libreria dell'utente)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | id | intero | si | identificativo del videogioco della libreria dell'utente  |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |

##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 200 | json contenente i dati del nuovo videogioco appena creato: created_at (data creazione), updated_at (ultimo aggiornamento), finished, hours, bought, status, videogame, platform |

</details>

<details>
<summary><code>PUT</code> <code>/libraries/videogames/:id</code> <code>(modifica i dettagli di un videogioco nella libreria dell'utente)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | id | intero | si | identificativo del videogioco della libreria dell'utente  |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | finished | data | no | indica se l'utente ha completato quel gioco o no |
> | hours | intero | no | quante ore ha giocato l'utente |
> | bought | booleano | no | se l'utente ha comprato quel gioco oppure no (default: false) |
> | status | Stato | no | puó assumere i seguenti valori: {Da giocare, Finito, Completato, Abbandonato} (default: 'Da giocare') |
> | platform | intero | si | id della piattaforma sul quale ci ha giocato |

##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 200| json contenente i dati del nuovo videogioco appena creato: created_at (data creazione), updated_at (ultimo aggiornamento), finished, hours, bought, status, videogame, platform |
> | 404 | game not found |
> | 400 | dettagli sul cosa c'é di sbagliato (es. campi malformati) |

</details>

<details>
<summary><code>DELETE</code> <code>/libraries/videogames/:id</code> <code>(rimuove  un videogioco dalla libreria dell'utente)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | id | intero | si | identificativo del videogioco della libreria dell'utente  |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |


##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 204 | null |
> | 404 | game not found |

</details>

#### Videogiochi - Rating (valutazioni)

<details>
<summary><code>GET</code> <code>/libraries/videogames/:id/rating</code> <code>(ritorna una valutazione di un videogioco nella libreria dell'utente)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | id | intero | si | identificativo del videogioco della libreria dell'utente  |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |

##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 200 | json contenente i dati della valutazione: id, comment (commento libero), ranking (numero da 1 a 10), is_public_comment e is_public_ranking (sviluppi futuri), created_at e updated_at (date contenenti data di creazione e di ultimo aggiornamento) |
> | 404 | rating not found |

</details>

<details>
<summary><code>POST</code> <code>/libraries/videogames/:id/rating</code> <code>(aginunge una valutazione di un videogioco nella libreria dell'utente)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | id | intero | si | identificativo del videogioco della libreria dell'utente  |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | finished | data | no | indica se l'utente ha completato quel gioco o no |
> | hours | intero | no | quante ore ha giocato l'utente |
> | bought | booleano | no | se l'utente ha comprato quel gioco oppure no (default: false) |
> | status | Stato | no | puó assumere i seguenti valori: {Da giocare, Finito, Completato, Abbandonato} (default: 'Da giocare') |
> | platform | intero | si | id della piattaforma sul quale ci ha giocato |

##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 201 | json contenente i dati aggiornati della valutazione: comment (commento libero), ranking (numero da 1 a 10), is_public_comment e is_public_ranking (sviluppi futuri), created_at e updated_at (date contenenti data di creazione e di ultimo aggiornamento) |
> | 409 | rating already exists! |
> | 400 | dettagli sul cosa c'é di sbagliato (es. campi malformati) |
> | 500 | internal server error (provocato da un incorretto save nel db) |

</details>


<details>
<summary><code>PUT</code> <code>/libraries/videogames/:id/rating</code> <code>(modifica i dettagli di una valutazione di un videogioco nella libreria dell'utente)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | id | intero | si | identificativo del videogioco della libreria dell'utente  |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | finished | data | no | indica se l'utente ha completato quel gioco o no |
> | hours | intero | no | quante ore ha giocato l'utente |
> | bought | booleano | no | se l'utente ha comprato quel gioco oppure no (default: false) |
> | status | Stato | no | puó assumere i seguenti valori: {Da giocare, Finito, Completato, Abbandonato} (default: 'Da giocare') |
> | platform | intero | si | id della piattaforma sul quale ci ha giocato |

##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 201 | json contenente i dati aggiornati della valutazione: comment (commento libero), ranking (numero da 1 a 10), is_public_comment e is_public_ranking (sviluppi futuri), created_at e updated_at (date contenenti data di creazione e di ultimo aggiornamento) |
> | 400 | dettagli sul cosa c'é di sbagliato (es. campi malformati) |

</details>

<details>
<summary><code>DELETE</code> <code>/libraries/videogames/:id/rating</code> <code>(rimuove una valutazione di un videogioco dalla libreria dell'utente)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |


##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 204 | null |

</details>

#### Videogiochi - Statistiche
<details>
<summary><code>GET</code> <code>/libraries/videogames/charts/completed</code> <code>(restituisce il numero di giochi 'completati' dall'utente loggato)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |


##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 200 | json fatto in questo modo: {'count': numero} |

</details>

<details>
<summary><code>GET</code> <code>/libraries/videogames/charts/finished</code> <code>(restituisce il numero di giochi 'finiti' dall'utente loggato)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |


##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 200 | json fatto in questo modo: {'count': numero} |

</details>

<details>
<summary><code>GET</code> <code>/libraries/videogames/charts/to-play</code> <code>(restituisce il numero di giochi 'da giocare' dall'utente loggato)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |


##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 200 | json fatto in questo modo: {'count': numero} |

</details>

<details>
<summary><code>GET</code> <code>/libraries/videogames/charts/abandoned</code> <code>(restituisce il numero di giochi 'abbandonati' dall'utente loggato)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |


##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 200 | json fatto in questo modo: {'count': numero} |

</details>

<details>
<summary><code>GET</code> <code>/libraries/videogames/charts/now-playing</code> <code>(restituisce il numero di giochi 'in corso' dall'utente loggato)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |


##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 200 | json fatto in questo modo: {'count': numero} |

</details>

<details>
<summary><code>GET</code> <code>/libraries/videogames/charts/completed-and-finished</code> <code>(restituisce il numero di giochi 'completati' e 'finiti' dall'utente loggato)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |


##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 200 | json fatto in questo modo: {'count': numero} |

</details>

<details>
<summary><code>GET</code> <code>/libraries/videogames/charts/total</code> <code>(restituisce il numero totale di giochi nella libreria dell'utente loggato)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |


##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 200 | json fatto in questo modo: {'count': numero} |

</details>

<details>
<summary><code>GET</code> <code>/libraries/videogames/charts/top-20</code> <code>(restituisce i venti giochi nella libreria dell'utente loggato che hanno il punteggio piu alto)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |


##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 200 | json: [{"ranking": numero, "name": nome_videogioco}...] |

</details>

<details>
<summary><code>GET</code> <code>/libraries/videogames/charts/top-platform</code> <code>(restituisce la piattaforma dove l'utente ha finito piu giochi)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |


##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 200 | json: {"platform": nome_piattaforma, "number of games": numero} |

</details>

<details>
<summary><code>GET</code> <code>/libraries/videogames/charts/most-used-platform</code> <code>(restituisce la piattaforma dove l'utente ha inserito piu giochi, non contando quelli 'da giocare')</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |


##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 200 | json: {"platform": nome_piattaforma, "number of games": numero} |

</details>

<details>
<summary><code>GET</code> <code>/libraries/videogames/charts/total-bought</code> <code>(restituisce il numero di giochi acquistati dall'utente)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |


##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 200 | json fatto in questo modo: {'count': numero} |

</details>


<details>
<summary><code>GET</code> <code>/libraries/videogames/charts/total-hours</code> <code>(numero totale di ore inserite dall'utente)</code></summary>

##### Parametri (URL)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |

##### Parametri (body)
> | nome             | tipo              | obbligatorio             | descrizione           |
> | -- | -- | -- | -- |
> | nessuno | - | - | - |


##### Codici di risposta
> | nome | messaggio                                                                                                   |
> |------|------------------------------------------------------------------------------------------------------------- |
> | 200 | json fatto in questo modo: {'count': numero} |

</details>