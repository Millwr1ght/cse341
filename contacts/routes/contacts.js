import Router from 'express';
import * as contactsController from '../controllers/contacts.js';

//contacts router
export const contacts_routes = Router();

/* --create-- */

//add contact to contacts table
contacts_routes.post('/add', contactsController.addContact)

/* --read-- */

//get all contacts
contacts_routes.get('/', contactsController.getAllContacts);

contacts_routes.get('/:contact_id', contactsController.getContactById);

/* --update-- */
contacts_routes.put('/update', contactsController.updateContactbyId)

/* --delete-- */
contacts_routes.delete('/delete', contactsController.deleteContactById)