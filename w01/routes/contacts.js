import { Router } from 'express';
import { status, contacts } from '../controllers/index.js';
const r_contacts = Router();

// status
r_contacts.get('/', status);

r_contacts.get('/contacts', contacts.getAll);
r_contacts.get('/contacts/:id', contacts.getById);


export { r_contacts };