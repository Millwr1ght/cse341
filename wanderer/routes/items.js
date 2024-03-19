import { Router } from 'express';
import * as itemsController from '../controllers/items.js';

const itemRouter = Router();

itemRouter.get('/', itemsController.getAllItems);

/* --create-- */
itemRouter.post('/', itemsController.addItem)

itemRouter.post('/:item_id/upload', itemsController.addImage)

/* --read-- */
itemRouter.get('/:item_id', itemsController.getItemById);

/* --update-- */
itemRouter.put('/:item_id', itemsController.updateItem)

/* --delete-- */
itemRouter.delete('/:item_id', itemsController.deleteItem)


export default itemRouter;