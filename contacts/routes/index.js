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