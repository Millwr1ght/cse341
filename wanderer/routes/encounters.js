import { Router } from 'express';
import * as encountersController from '../controllers/encounters.js';

const encounterRouter = Router();

encounterRouter.get('/', encountersController.getAllMaps);

/* --create-- */
encounterRouter.post('/add', encountersController.addMap)

/* --read-- */
encounterRouter.get('/:encounter_id', encountersController.getMapById);

/* --update-- */
encounterRouter.put('/update/:encounter_id', encountersController.updateMap)

/* --delete-- */
encounterRouter.delete('/delete/:encounter_id', encountersController.deleteMap)


export default encounterRouter;