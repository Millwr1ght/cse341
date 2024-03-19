import { Router } from 'express';
import * as mapsController from '../controllers/maps.js';

const mapRouter = Router();

mapRouter.get('/', mapsController.getAllMaps);

/* --create-- */
mapRouter.post('/', mapsController.addMap)

/* --read-- */
mapRouter.get('/:map_id', mapsController.getMapById);

/* --update-- */
mapRouter.put('/', mapsController.updateMap)

/* --delete-- */
mapRouter.delete('/:map_id', mapsController.deleteMap)


export default mapRouter;