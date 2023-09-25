import { Router } from 'express';
import { contacts } from '../controllers/contacts.js';
const r_contacts = Router();

// status
r_contacts.get('/', contacts.getAll);
r_contacts.get('/:id', contacts.getById);


export { r_contacts };