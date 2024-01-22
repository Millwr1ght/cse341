import Router from 'express';
import * as contactsController from '../controllers/contacts.js';

//contacts router
export const contacts_routes = Router();

//get all contacts
contacts_routes.get('/', contactsController.getAllContacts);

contacts_routes.get('/:contact_id', contactsController.getContactById);