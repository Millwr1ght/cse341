import Router from 'express';
import * as baseController from '../controllers/index.js';

//main router + routes
export const routes = Router();

// home
routes.get('/', baseController.getName);

// params practice
routes.get('/users/:name', (req, res) => {
    res.send(req.params.name)
});

// the linktree assignment route
routes.get('/professional', baseController.getUser);

//get all contacts
routes.get('/contacts', baseController.getAllContacts);

routes.get('/users/:user_id', baseController.getContactById);