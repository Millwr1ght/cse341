import { err400, err500, err501, success200, success204 } from "./statuses.js";
import { buildIdQuery } from "../library/utils.js";
import 'dotenv/config';
//import { getDb } from "../db/connection.js";
import db from "../db/mongoose.js";

import mongoose from "mongoose";

// const USER = new mongoose.Model('users', { name: String })
const USER = db.user;

export const addUser = async (req, res) => {
    try {

    } catch (error) {
        console.log('[server]: CREATE error: ', error);
        err500(res)
    }
}

export const getAllUsers = async (req, res) => {
    /* */
    try {
        //connect &query database

        //mongoose
        USER.find({})//.toArray()
            .then((data) => {
                console.log(data);
                success200(res, data, `Found some users!`)
            })
            .catch((error) => {
                err500(res, `[mongoose]: GET ALL error: ${error}`)
            })


    } catch (error) {
        console.log('[server]: GET ALL error: ', error);
        err500(res)
    }
}

export const getUserById = async (req, res) => {
    try {

    } catch (error) {
        console.log('[server]: GET ONE error: ', error);
        err500(res)
    }
}

export const getTopUsers = async (req, res) => {
    /* */

    const queryStat = req.params.stat

    const query = { 'profileIsPublic': true }

    const options = {
        projection: { _id: 1, username: 1, playerStats: 1 }
    }

    try {
        //connect &query database

        //mongoose
        USER.find(query, options).toArray()
            .then((data) => {
                success200(res, data[0], `Found some users!`)
            })
            .catch((error) => {
                err500(res, `[mongoose]: READ error: ${error}`)
            })


    } catch (error) {
        console.log('[server]: GET ALL error: ', error);
        err500(res)
    }

}

export const updateUser = async (req, res) => {
    try {

    } catch (error) {
        console.log('[server]: UPDATE error: ', error);
        err500(res)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const idToDelete = req.params.user_id;

        USER.deleteOne({ _id: idToDelete })
            .then((data) => {
                success204(res)
            })
            .catch((error) => {
                console.log('[mongoose]: DELETE error: ', error);
                err500(res);
            })

    } catch (error) {
        console.log('[server]: DELETE error: ', error);
        err500(res)
    }
}
