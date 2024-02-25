import { Router } from 'express';
import * as recipesController from '../controllers/recipes.js';

const recipeRouter = Router();

/* --create-- */
recipeRouter.post('/add', recipesController.addRecipe)

/* --read-- */
recipeRouter.get('/', recipesController.getAllRecipes);

recipeRouter.get('/:recipe_id', recipesController.getRecipeById);

/* --update-- */
recipeRouter.put('/update', recipesController.updateRecipebyId)

/* --delete-- */
recipeRouter.delete('/delete', recipesController.deleteRecipeById)


export default recipeRouter;