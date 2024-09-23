import express from "express";
import movieRouter from "./routes/films";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/pizzas", movieRouter);

export default app;
