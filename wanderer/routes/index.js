import Router from 'express';
import axios from 'axios';
import swagger from './swagger.js';
import itemRouter from './items.js';
import mapRouter from './maps.js';
import userRouter from './users.js';
import encounterRouter from './encounters.js';

//set up html delivery
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//main router + routes
const routes = Router();

//the home page
routes.get('/', (req, res) => {
    console.log('[server]: access token: ', req.query.token);

    res.status(200)
        .sendFile(path.join(__dirname, '../static/index.html'))
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

//database collections
routes.use('/user', userRouter);

routes.use('/items', itemRouter);

routes.use('/maps', mapRouter);

routes.use('/encounters', encounterRouter);

//get the api-doc
routes.use('/api-docs', swagger);

//make coffee
routes.get('/coffee', (req, res) => {
    //except don't
    let thisAppCanMakeCoffee = false;
    if (thisAppCanMakeCoffee) {
        res.send(200).send("please wait for assistance")
    } else {
        res.status(418)
            .send("418 error. \nsorry dave, i'm afraid i can't do that")
    }
})

export default routes;