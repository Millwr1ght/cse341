import { Router } from 'express';
import * as encountersController from '../controllers/encounters.js';

const encounterRouter = Router();

encounterRouter.get('/', encountersController.getAllEncounters);

/* --create-- */
encounterRouter.post('/', encountersController.addEncounter)
encounterRouter.post('/submit', encountersController.protoEncounter)

/* --read-- */
encounterRouter.get('/:encounter_id', encountersController.getEncounterById);

/* --update-- */
encounterRouter.put('/', encountersController.updateEncounter)

/* --delete-- */
encounterRouter.delete('/:encounter_id', encountersController.deleteEncounter)


export default encounterRouter;