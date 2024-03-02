import Router from 'express';
import axios from 'axios';
import recipeRouter from './recipes.js';
import cookbookRouter from './cookbooks.js';
import swagger from './swagger.js';

//pathing
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//main router + routes
export const routes = Router();

// on the home page, show the name of someone I know
routes.get('/', (req, res) => {
    console.log(req.query.token);

    res.status(200)
        .sendFile(path.join(__dirname, '../static/main.html'))
});

//auth
routes.get('/auth', (req, res) => {
    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    );
})

routes.get('/oauth-callback', ({ query: { code } }, res) => {
    const body = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_SECRET,
        code,
    }

    const options = { headers: { accept: 'application/json' } };
    axios
        .post('https://github.com/login/oauth/access_token', body, options)
        .then((_res) => _res.data.access_token)
        .then((token) => {
            console.log('My token:', token);

            res.redirect(`/?token=${token}`);
        })
        .catch((err) => res.status(500).json({ err: err.message }));
})

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