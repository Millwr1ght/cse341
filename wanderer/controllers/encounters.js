import { err400, err500, success204 } from "./statuses.js";
import { buildIdQuery } from "../library/utils.js";
import 'dotenv/config';
import { getDb } from "../db/connection.js";

// add encounter to table
export const addEncounter = async (req, res) => {
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add new encounter.',
            schema: { $ref: '#/definitions/AddEncounter' }
    } */

    // make sure there's a body
    if (!req.body) { err400(res); }

    //make sure body has members
    if (!req.body.title || !req.body.description || !req.body.author || !req.body.flavor) {
        err400(res, 'Encounter you are trying to add is missing information! Make sure you have all required fields.')
    }

    try {
        const newEncounter = {
            title: req.body.title,
            flavor: req.body.flavor,
            description: req.body.description,
            author: req.body.author,
        }

        const result = await getDb().collection('encounters').insertOne(newEncounter);

        if (result) {
            success201(res, null, `New encounter added with _id: ${result.insertedId}`)
            console.log(`New encounter added with _id: ${result.insertedId}`);
        }
    } catch (error) {
        console.log('[server]: CREATE error: ', error);
        err500(res)
    }
}

// add encounter-submitted encounter to table [STRETCH GOAL]
// these are the same for now
export const protoEncounter = async (req, res) => {
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add new encounter.',
            schema: { $ref: '#/definitions/AddEncounter' }
    } */

    // make sure there's a body
    if (!req.body) { err400(res); }

    //make sure body has members
    if (!req.body.title || !req.body.description || !req.body.author || !req.body.flavor) {
        err400(res, 'Encounter you are trying to add is missing information! Make sure you have all required fields.')
    }

    try {
        const newEncounter = {
            title: req.body.title,
            flavor: req.body.flavor,
            description: req.body.description,
            author: req.body.author,
        }

        const result = await getDb().collection('encounters').insertOne(newEncounter);

        if (result) {
            success201(res, null, `New encounter added with _id: ${result.insertedId}`)
            console.log(`New encounter added with _id: ${result.insertedId}`);
        }
    } catch (error) {
        console.log('[server]: CREATE error: ', error);
        err500(res)
    }
}

// list all encounters
export const getAllEncounters = async (req, res) => {
    /* */
    try {
        //connect &query database
        const result = await getDb().collection('encounters').find({})

        //output result
        if (result) {
            const results = await result.toArray();
            success200(res, results, `Found some encounters!`)
        } else {
            err404(res, `No encounters found.`)
            console.log(`No encounters found.`);
        }

    } catch (error) {
        console.log('[server]: GET ALL error: ', error);
        err500(res)
    }
}

// list one encounter
export const getEncounterById = async (req, res) => {
    try {
        //build query args
        console.log(req.params);

        if (!req.params.encounter_id) {
            err404(res, 'you need to give us a encounter_id!')
        }

        const encounterToGet = buildIdQuery(req.params.encounter_id)

        //query
        const result = await await getDb().collection('encounters').findOne(encounterToGet);

        if (result) {
            console.log(`Found a encounter: `, result);
            success200(res, result, `Found an encounter!`)
        } else {
            err404(res, `No encounters found.`)
        }
    } catch (error) {
        console.log(`[server]: GET ONE error: `, error);
        err500(res)
    }
}

// update
export const updateEncounter = async (req, res) => {
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Update encounter.',
            schema: { $ref: '#/definitions/UpdateEncounter' }
    } */

    // make sure there's a body
    if (!req.body) { err400(res); }

    try {
        //build query
        const encounterToFind = buildIdQuery(req.body.encounterId)
        //build update
        const update = {
            $set: {
                title: req.body.title,
                flavor: req.body.flavor,
                description: req.body.description,
                author: req.body.author,
            }
        }
        const options = req.body.options;
        //send it
        const result = await getDb().collection('encounters').findOneAndUpdate(encounterToFind, update, options);
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

// delete
export const deleteEncounter = async (req, res) => {
    /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Delete encounter.',
        schema: { $ref: '#/definitions/DeleteEncounter' }
    } */
    //use params
    if (!req.params.encounter_id) {
        err404(res, 'you need to give us a encounter_id!')
    }

    try {
        const encounterToDelete = buildIdQuery(req.params.encounterId);

        const result = await getDb().collection('encounters').deleteOne(encounterToDelete)

        console.log(result);

        if (result.deletedCount === 0) {
            err500(res);
        } else {
            success204(res);
        }

    } catch (error) {
        console.error(error);
        err500(res);
    }
}
