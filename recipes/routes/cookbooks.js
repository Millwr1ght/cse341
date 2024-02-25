import { Router } from 'express';
import * as cookbooksController from '../controllers/cookbooks.js';

const cookbookRouter = Router();

/* --create-- */
//add cookbook to cookbooks table
cookbookRouter.post('/add', cookbooksController.addCookbook)

/* --read-- */
//get all cookbooks
cookbookRouter.get('/', cookbooksController.getAllCookbooks);

//get one(1) cookbook
cookbookRouter.get('/:cookbook_id', cookbooksController.getCookbookById);

/* --update-- */
cookbookRouter.put('/update', cookbooksController.updateCookbookbyId)

/* --delete-- */
cookbookRouter.delete('/delete', cookbooksController.deleteCookbookById)


export default cookbookRouter;