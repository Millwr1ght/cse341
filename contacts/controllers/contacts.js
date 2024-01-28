/* contacts controller */
import { contactsCollection } from "../db/connection.js";
import { BSON } from "mongodb";
import 'dotenv/config';


//auxilliary
function buildIdQuery(idNum) {
    const bId = new BSON.ObjectId(idNum)
    return { _id: bId }
}

/* --create-- */
export const addContact = async (req,res,next) => {
    try {
        const result = await contactsCollection().insertOne(req.body);
        console.log(`New contact added with _id: ${result.insertedId}`);
        res.redirect('/contacts');
    } catch (error) {
        console.error(error);
    }
}


/* --read-- */
// get all documents form the contacts table
export const getAllContacts = async (req,res,next) => {
    //connect &query database
    const result = await contactsCollection().find({});

    //output result
    if (result) {
        //console.log(`Found the following contact(s): `);
        const results = await result.toArray();
        res.send(results);
    } else {
        console.log(`No one found.`);
    }
}

export const getContactById = async (req,res,next) => {
    //build query args
    console.log(req.params);
    const bId = new BSON.ObjectId(req.params.contact_id)
    const contactToGet = { _id: bId }

    //query
    const result = await contactsCollection().findOne(contactToGet);

    if(result) {
        console.log("Found a contact: ");
        res.send(result);
        console.log(result);
    } else {
        res.send("No contacts found :(")
    }
}

/* --update-- */

export const updateContactbyId = async (req,res,next) => {
    try {
        //build query
        const contactToFind = buildIdQuery(req.body.contactId)
        //build update
        const update = {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                favoriteColor: req.body.favoriteColor,
                birthday: req.body.birthday
            }
        }
        const options = req.body.options;
        //send it
        const result = await contactsCollection().updateOne(contactToFind, update, options);
        if (result) {
            //console.log(`Contact updated with _id: ${result.value._id}`);
            res.json('Success!');
        } else {
            console.log(`Something went wrong :[`);
            res.json('Something went wrong');
        }
    } catch (error) {
        console.error(error);
    }
}


/* --delete-- */
export const deleteContactById = async (req,res,next) => {
    try { 
        const contactToDelete = buildIdQuery(req.body.contact_id);

        const result = await contactsCollection().deleteOne(contactToDelete)
        if (result.deletedCount === 0) {
            console.log(`Something went wrong :[`);
            res.json('Something went wrong');
            
        } else {
            res.json('Success!');
        }
    } catch (error) {
        console.error(error);
    }
}