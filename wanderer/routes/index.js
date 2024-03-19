import Router from 'express';
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
    console.log('[server]: token: ', req.query.token);

    res.status(200)
        .sendFile(path.join(__dirname, '../static/index.html'))
});

//database collections
routes.use('/user', userRouter);

routes.use('/items', itemRouter);

routes.use('/maps', mapRouter);

routes.use('/encounters', encounterRouter);

//get the api-doc
routes.use('/api-docs', swagger);

//make coffee
routes.get('/coffee', (req, res) => {
    let thisAppCanMakeCoffee = false;
    if (thisAppCanMakeCoffee) {
        res.send(200).send("please wait for assistance")
    } else {
        res.status(418)
            .send("418 error. \nsorry dave, i'm afraid i can't do that")
    }
})

export default routes;