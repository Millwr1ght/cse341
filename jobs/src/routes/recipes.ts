import { Router } from "express";

const recipeRouter = Router();

//get all recipes
recipeRouter.use('/', (req, res) => {
    res.send('recipes!')
})

export default recipeRouter;