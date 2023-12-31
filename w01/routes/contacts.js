import { Router } from 'express';
import { contacts } from '../controllers/contacts.js';
const r_contacts = Router();

// status
r_contacts.get('/', contacts.getAll);
r_contacts.get('/id/:id', contacts.getById);
r_contacts.get("/query/:query", contacts.getByQuery);
r_contacts.post("/add", contacts.create)


export { r_contacts };