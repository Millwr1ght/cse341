/* base controller */
import { getDb } from "../db/connection.js";
import 'dotenv/config';

// return a name of someone I know
export const getName = (req, res) => {
    res.send('Emily!')
};

//get a document from the users table
export const getUser = async (req,res,next) => {
    //connect to database
    const result = await getDb().db(process.env.DB_NAME).collection("users").findOne({_id: 1});

    if (result) {
        console.log(result);
        res.send(result);
    } else {
        console.log(`Query returned nothing.`);
    }
}