import { Router } from "express";

import { Film, NewFilm } from "../types";


const router = Router();


const films: Film[] = [
    {
        id: 1,
        title: "The Shawshank Redemption",
        director: "Frank Darabont",
        duration: 142,
        budget: 25000000,
        description: new URL("https://en.wikipedia.org/wiki/The_Shawshank_Redemption"),
        imageURL: new URL("https://en.wikipedia.org/wiki/The_Shawshank_Redemption#/media/File:ShawshankRedemptionMoviePoster.jpg"),
    },

    {
        id: 2,
        title: "The Godfather",
        director: "Francis Ford Coppola",
        duration: 175,
        budget: 6000000,
        description: new URL("https://en.wikipedia.org/wiki/The_Godfather"),
        imageURL: new URL("https://en.wikipedia.org/wiki/The_Godfather#/media/File:Godfather_ver1.jpg"),
    },

    {
        id: 3,
        title: "The Dark Knight",
        director: "Christopher Nolan",
        duration: 152,
        budget: 185000000,
        description: new URL("https://en.wikipedia.org/wiki/The_Dark_Knight_(film)"),
        imageURL: new URL("https://en.wikipedia.org/wiki/The_Dark_Knight_(film)#/media/File:Dark_Knight.jpg"),
    },
];


//read all films and/or filter by minimum duration
router.get("/", (_req, res) => {
    if (!_req.query["minimum-duration"]) {
        return res.json(films);
      }
      const minDuration = Number(_req.query["minimum-duration"]);
      const filteredFilms = films.filter((films) => {
        return films.duration >= minDuration;
      });
      
    return res.json(filteredFilms);
});


//read a single film by id
router.get("/:id", (_req, res) => {
    const id = Number(_req.params.id);
    const film = films.find((film) => film.id === id);
    if (!film) {
        return res.status(404);
    }
    return res.json(film);
});


//create a new film
router.post("/", (req, res) => {
    const body: unknown = req.body;
    if (!body || 
        typeof body !== "object" ||
        !("title" in body) ||
        !("director" in body) ||
        !("duration" in body) ||
        typeof body.title !== "string" ||
        typeof body.director !== "string" ||
        typeof body.duration !== "number" ||
        !body.title.trim() ||
        !body.director.trim() ||
        body.duration <= 0
    ){
        return res.status(400);
    }

    const { title, director, duration, budget, description, imageURL } = body as NewFilm;

    const nextId = films.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) + 1;

    const addedFilm: Film = {
        id: nextId,
        title,
        director,
        duration,
        budget,
        description,
        imageURL,
    };

    films.push(addedFilm);

    return res.json(addedFilm);
});



export default router;