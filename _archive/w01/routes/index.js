import { Router } from 'express';
import { status } from '../controllers/index.js';
import { r_contacts } from "./contacts.js";
const router = Router();

// home page
//router.get('/', getName);

// status
router.get('/', status);

router.use("/contacts", r_contacts);

export { router };