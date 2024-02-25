import { Router } from 'express';
import * as recipesController from '../controllers/recipes.js';

const recipeRouter = Router();

//get all recipes
recipeRouter.use('/', (req, res) => {
    res.status(200)
        .send('recipes!')
})

/* --create-- */

//add recipe to recipes table
recipeRouter.post('/add', recipesController.addRecipe)

/* --read-- */

//get all recipes
recipeRouter.get('/', recipesController.getAllRecipes);

recipeRouter.get('/:recipe_id', recipesController.getRecipeById);

/* --update-- */
recipeRouter.put('/update', recipesController.updateRecipebyId)

/* --delete-- */
recipeRouter.delete('/delete', recipesController.deleteRecipeById)


export default recipeRouter;