import { err400, err500, success204 } from "./statuses.js";
import { buildIdQuery } from "../library/utils.js";
import 'dotenv/config';
import { getDb } from "../db/connection.js";

export const logInUser = (req, res) => { /* */ }

export const logOutUser = (req, res) => { /* */ }

export const addUser = (req, res) => { /* */ }

export const getAllUsers = async (req, res) => {
    /* */
    try {
        //connect &query database
        const db = getDb()
        const result = await db.collection('users').find({});

        //output result
        if (result) {
            //console.log(`Found the following recipe(s): `);
            const results = await result.toArray();
            res.status(200)
                .send(results);
        } else {
            res.status(404)
            console.log(`No recipes found.`);
        }
    } catch (error) {
        console.log('GET ALL error: ', error);
        err500(res)
    }
}

export const getUserById = (req, res) => { /* */ }

export const getTopUsers = (req, res) => { /* */ }

export const updateUser = (req, res) => { /* */ }

export const deleteUser = (req, res) => { /* */ }
