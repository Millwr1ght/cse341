import Router from 'express';
import swagger from './swagger.js';
import itemRouter from './items.js';
import mapRouter from './maps.js';
import userRouter from './users.js';
import encounterRouter from './encounters.js';

//main router + routes
const routes = Router();

// on the home page, show the name of someone I know
routes.get('/', (req, res) => {
    console.log('[server]: token: ', req.query.token);

    res.status(200).send('welcome!')
});

//database collections
routes.use('/user', userRouter);

routes.use('/items', itemRouter);

routes.use('/maps', mapRouter);

routes.use('/encouters', encounterRouter);

//get the api-doc
routes.use('/api-docs', swagger);

//make coffee
routes.get('/coffee', (req, res) => {
    if (thisAppCanMakeCoffee) {
        res.send(200).send("please wait for assistance")
    } else {
        res.status(418)
            .send("418 error. \nsorry dave, i'm afraid i can't do that")
    }

})

export default routes;