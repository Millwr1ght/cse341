import { Router } from 'express';
import * as mapsController from '../controllers/maps.js';

const mapRouter = Router();

mapRouter.get('/', mapsController.getAllMaps);

/* --create-- */
mapRouter.post('/add', mapsController.addMap)

/* --read-- */
mapRouter.get('/:map_id', mapsController.getMapById);

/* --update-- */
mapRouter.put('/update/:map_id', mapsController.updateMap)

/* --delete-- */
mapRouter.delete('/delete/:map_id', mapsController.deleteMap)


export default mapRouter;