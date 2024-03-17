import Router from 'express';
import swagger from './swagger.js';

//main router + routes
const routes = Router();

// on the home page, show the name of someone I know
routes.get('/', (req, res) => {
    console.log('[server]: token: ', req.query.token);

    res.status(200).send('welcome!')
});


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