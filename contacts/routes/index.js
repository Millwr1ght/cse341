import Router from 'express';
import * as baseController from '../controllers/index.js';
import { contacts_routes } from '../routes/contacts.js';
import swagger from './swagger.js';

//main router + routes
export const routes = Router();

// on the home page, show the name of someone I know
routes.get('/', baseController.getName);

// params practice
// routes.get('/users/:name', (req, res) => {
//     res.send(req.params.name)
// });

// the linktree assignment route
routes.get('/professional', baseController.getUser);

//get all contacts
routes.use('/contacts', contacts_routes);

//get the api-doc
routes.use('/api-docs', swagger);