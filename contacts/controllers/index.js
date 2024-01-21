/* base controller */
import { dbConnect, getAllContacts } from "../db/connection.js";

// return a name of someone I know
export const getName = (req, res) => {
    res.send('Emily!')
};

//get a document from the users table
export const getUser = (req,res) => {
    //connect to database
    dbConnect(async (client) => {
        const result = await client.db(process.env.DB_NAME).collection("users").findOne({_id: 1});

        if (result) {
            console.log(result);
            res.send(result);
        } else {
            console.log(`Query returned nothing.`);
        }
    }).catch(console.dir);
}

// get all documents form the contacts table
export const getAllContacts = (req, res) => {
    //connect to database
    dbConnect(async (client) => {
        //query db
        const result = await client.db(process.env.DB_NAME).collection("contacts").find({});

        //output result
        if (result) {
            console.log(`Found the following contact(s): `);
            const results = await result.toArray();
            // results.forEach((result, i) => {
            //     console.log(`${i + 1}. name: ${result.firstName} ${result.lastName}`);
            //     console.log(`   email: ${result.email}`);
            //     console.log(`   favorite colour: ${result.favoriteColor}`);
            //     console.log();
            // })
            res.send(results);
        } else {
            console.log(`No one found.`);
        }
    }).catch(console.dir);
}

export const getContact = (req, res) => {
    const userToGet = { _id: req.params.user_id }

    dbConnect(async (client, userToGet) => {
        //query
        const result = await client.db(process.env.DB_NAME).collection("contacts").find(userToGet);
    });
}