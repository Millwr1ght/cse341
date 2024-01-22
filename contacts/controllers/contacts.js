/* contacts controller */
import { dbConnect, getDb } from "../db/connection.js";
import { ObjectId, BSON } from "mongodb";
import 'dotenv/config';


// get all documents form the contacts table
export const getAllContacts = async (req,res,next) => {
    //connect &query database
    const result = await getDb().db(process.env.DB_NAME).collection("contacts").find({});

    //output result
    if (result) {
        console.log(`Found the following contact(s): `);
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
    const result = await getDb().db(process.env.DB_NAME).collection("contacts").findOne(contactToGet);

    if(result) {
        console.log("Found a contact: ");
        res.send(result);
        console.log(result);
    } else {
        res.send("No contacts found :(")
    }
    
}