import { Router } from 'express';
import * as itemsController from '../controllers/items.js';

const itemRouter = Router();

itemRouter.get('/', itemsController.getAllItems);

/* --create-- */
itemRouter.post('/add', itemsController.addItem)

/* --read-- */
itemRouter.get('/:item_id', itemsController.getItemById);

/* --update-- */
itemRouter.put('/update/:item_id', itemsController.updateItem)

/* --delete-- */
itemRouter.delete('/delete/:item_id', itemsController.deleteItem)


export default itemRouter;