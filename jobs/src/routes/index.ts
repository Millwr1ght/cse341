import { Router } from "express";
import swagger from "./swagger";
import recipeRouter from "./recipes"
//const recipes = require('./recipes');



const routes = Router();

routes.use('/recipes', recipeRouter);
routes.use('/api-docs', swagger);
routes.use('/', (req, res) => {
    res.send('huh. it works?')
})

export default routes;