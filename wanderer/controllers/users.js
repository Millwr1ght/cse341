import { err400, err404, err500, success200, success201, success204 } from "./statuses.js";
import { buildIdQuery } from "../library/utils.js";
import 'dotenv/config';
import { getDb } from "../db/connection.js";

//import db from "../db/mongoose.js";
//import mongoose from "mongoose";

// const USER = new mongoose.Model('users', { name: String })
// const USER = db.user;


export const addUser = async (req, res) => {
    /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Add new user.',
        schema: { $ref: '#/definitions/AddUser' }
    } */

    // make sure there's a body
    if (!req.body) { err400(res); }

    //make sure body has members
    if (!req.body.username || !req.body.password) {
        err400(res, 'User you are trying to add is missing information! Make sure you have all required fields (username, password)')
    }

    try {
        const newUser = {
            username: req.body.username,
            password: req.body.password,
            profileIsPublic: false,
            playerData: {
                inventory: [],
                stats: {
                    exp: 0,
                    hp: 10,
                    def: 1,
                    atk: 3,
                    speed: 1,
                    gold: 0,
                },
            },
        }

        const result = await getDb().collection('users').insertOne(newUser);

        if (result) {
            success201(res, null, `New cookbook added with _id: ${result.insertedId}`)
            console.log(`New cookbook added with _id: ${result.insertedId}`);
        }
    } catch (error) {
        console.log('[server]: CREATE error: ', error);
        err500(res)
    }
}

export const getAllUsers = async (req, res) => {
    /* */
    try {
        //connect &query database
        const result = await getDb().collection('users').find({})

        //output result
        if (result) {
            const results = await result.toArray();
            success200(res, results, `Found some users!`)
        } else {
            err404(res, `No users found.`)
            console.log(`No users found.`);
        }

    } catch (error) {
        console.log('[server]: GET ALL error: ', error);
        err500(res)
    }
}

export const getUserById = async (req, res) => {
    try {
        //build query args
        console.log(req.params);

        if (!req.params.user_id) {
            err404(res, 'you need to give us a user_id!')
        }

        const userToGet = buildIdQuery(req.params.user_id)

        //query
        const result = await await getDb().collection('users').findOne(userToGet);

        if (result) {
            console.log(`Found a user: `, result);
            success200(res, result, `Found a user!`)
        } else {
            err404(res, `No users found.`)
        }
    } catch (error) {
        console.log(`[server]: GET ONE error: `, error);
        err500(res)
    }
}

export const getTopUsers = async (req, res) => {
    /* */

    const queryStat = req.params.stat

    const stats = ['exp', 'hp', 'def', 'atk', 'speed', 'gold'];

    //data validata
    if (!stats.includes(queryStat)) {
        err404(res, `${queryStat} is not one of 'exp', 'hp', 'def', 'atk', 'speed', or 'gold'. Try again.`);
    }

    const pipeline = [];
    pipeline.push({
        $match: { 'profileIsPublic': true },
    });
    pipeline.push({
        $sort: {
            "exp": 1,
        }
    });
    pipeline.push({
        $limit: 10
    });
    pipeline.push({
        $unset: [
            "_id",
            "password",
            "profileIsPublic",
        ]
    });

    try {
        //connect &aggregate database
        const result = await getDb().collection('users').aggregate(pipeline);

        //output result
        if (result) {
            const results = await result.toArray();
            success200(res, results, `Found some users!`)
        } else {
            err404(res, `No users found.`)
            console.log(`No users found.`);
        }

    } catch (error) {
        console.log('[server]: GET ALL error: ', error);
        err500(res)
    }

}

export const updateUser = async (req, res) => {
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Update user.',
            schema: { $ref: '#/definitions/UpdateUser' }
    } */

    // make sure there's a body
    if (!req.body) { err400(res); }

    try {
        //build query
        const userToFind = buildIdQuery(req.body.userId)
        //build update
        const update = {
            $set: {
                username: req.body.username,
                password: req.body.password,
                profileIsPublic: req.body.profileIsPublic,
                playerData: req.body.playerData,
            }
        }
        const options = req.body.options;
        //send it
        const result = await getDb().collection('users').findOneAndUpdate(userToFind, update, options);
        if (result) {
            success204(res);
        } else {
            console.log(`Something went wrong :[`);
            err500(res);
        }
    } catch (error) {
        console.log('[server]: UPDATE error: ', error);
        err500(res)
    }
}

export const deleteUser = async (req, res) => {
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Delete user.',
            schema: { $ref: '#/definitions/DeleteUser' }
    } */

    // make sure there's a body
    //if (!req.body) { err400(res); }

    //use params
    if (!req.params.user_id) {
        err404(res, 'you need to give us a user_id!')
    }

    try {
        const userToDelete = buildIdQuery(req.params.user_id)

        const result = await getDb().collection('users').deleteOne(userToDelete)

        console.log(result);

        if (result.deletedCount === 0) {
            err500(res);
        } else {
            success204(res);
        }
    } catch (error) {
        console.log('[server]: DELETE error: ', error);
        err500(res)
    }
}
