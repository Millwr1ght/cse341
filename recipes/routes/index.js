import Router from 'express';
import recipeRouter from './recipes.js';
import swagger from './swagger.js';
import cookbookRouter from './cookbooks.js';

//main router + routes
export const routes = Router();

// on the home page, show the name of someone I know
routes.get('/', (req, res) => {
    res.status(200)
        .send('hello world!\nwelcome to my collection of cookbooks')
});

//get all contacts
routes.use('/recipes', recipeRouter);

routes.use('/cookbooks', cookbookRouter);

//get the api-doc
routes.use('/api-docs', swagger);

//make coffee
routes.use('/coffee', (req, res) => {
    res.status(418)
        .send("418 error. \nsorry dave, i'm afraid i can't do that")
})

export default routes;