import { err400, err404, err500, success200, success204 } from "./statuses.js";
import { buildIdQuery } from "../library/utils.js";
import 'dotenv/config';
import { getDb } from "../db/connection.js";

export const addMap = async (req, res) => {
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add new map.',
            schema: { $ref: '#/definitions/AddMap' }
    } */

    // make sure there's a body
    if (!req.body) { err400(res); }

    //make sure body has members
    if (!req.body.name || !req.body.tilemap || !req.body.height || !req.body.width) {
        err400(res, 'Map you are trying to add is missing information! Make sure you have all required fields.')
    }

    try {
        const newMap = {
            name: req.body.name,
            tilemap: req.body.tilemap,
            height: req.body.height,
            width: req.body.width,
        }

        const result = await getDb().collection('maps').insertOne(newMap);

        if (result) {
            success201(res, null, `New map added with _id: ${result.insertedId}`)
            console.log(`New map added with _id: ${result.insertedId}`);
        }
    } catch (error) {
        console.log('[server]: CREATE error: ', error);
        err500(res)
    }
}

export const getAllMaps = async (req, res) => {
    /* */
    try {
        //connect &query database
        const result = await getDb().collection('maps').find({})

        //output result
        if (result) {
            const results = await result.toArray();
            success200(res, results, `Found some maps!`)
        } else {
            err404(res, `No maps found.`)
            console.log(`No maps found.`);
        }

    } catch (error) {
        console.log('[server]: GET ALL error: ', error);
        err500(res)
    }
}

export const getMapById = async (req, res) => {
    try {
        //build query args
        console.log(req.params);

        if (!req.params.map_id) {
            err404(res, 'you need to give us a map_id!')
        }

        const mapToGet = buildIdQuery(req.params.map_id)

        //query
        const result = await await getDb().collection('maps').findOne(mapToGet);

        if (result) {
            console.log(`Found a map: `, result);
            success200(res, result, `Found an map!`)
        } else {
            err404(res, `No maps found.`)
        }
    } catch (error) {
        console.log(`[server]: GET ONE error: `, error);
        err500(res)
    }
}

export const updateMap = async (req, res) => {
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Update map.',
            schema: { $ref: '#/definitions/UpdateMap' }
    } */

    // make sure there's a body
    if (!req.body) { err400(res); }

    try {
        //build query
        const mapToFind = buildIdQuery(req.body.mapId)
        //build update
        const update = {
            $set: {
                name: req.body.name,
                tilemap: req.body.tilemap,
                height: req.body.height,
                width: req.body.width,
            }
        }
        const options = req.body.options;
        //send it
        const result = await getDb().collection('maps').findOneAndUpdate(mapToFind, update, options);
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

export const deleteMap = async (req, res) => {
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Delete map.',
            schema: { $ref: '#/definitions/DeleteMap' }
    } */

    //use params
    if (!req.params.map_id) {
        err404(res, 'you need to give us a map_id!')
    }

    try {
        const mapToDelete = buildIdQuery(req.params.map_id)

        const result = await getDb().collection('maps').deleteOne(mapToDelete)

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
