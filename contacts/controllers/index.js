/* base controller */
import { dbConnect } from "../db/connection.js";

// return a name of someone I know
export const getName = (req, res) => {
    res.send('Emily!')
};

//get a document from the users table
export const getUser = (req,res) => {
    //connect to database
    dbConnect(async (client, filter) => {
        const result = await client.db(process.env.DB_NAME).collection("users").find({});

        if (result) {
            console.log(result);
            res.send(result);
        } else {
            console.log(`Query ${fName} returned nothing.`);
        }
    }, filter).catch(console.dir);
}

// get all documents form the contacts table
export const getAllContacts = (req, res) => {
    //connect to database
    dbConnect(async (client) => {
        //query
        const result = await client.db(process.env.DB_NAME).collection("contacts").find({});

        //output
        if (result) {
            console.log(result);
            res.send(result);
        } else {
            console.log(`No contacts in your contacts, or something went wrong.`);
        }
    }).catch(console.dir);
}