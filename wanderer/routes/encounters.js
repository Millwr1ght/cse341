import { Router } from 'express';
import * as encountersController from '../controllers/encounters.js';

const encounterRouter = Router();

encounterRouter.get('/', encountersController.getAllEncounters);

/* --create-- */
encounterRouter.post('/add', encountersController.addEncounter)

/* --read-- */
encounterRouter.get('/:encounter_id', encountersController.getEncounterById);

/* --update-- */
encounterRouter.put('/update/:encounter_id', encountersController.updateEncounter)

/* --delete-- */
encounterRouter.delete('/delete/:encounter_id', encountersController.deleteEncounter)


export default encounterRouter;