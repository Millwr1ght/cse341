import { err400, err404, err500, success200, success201, success204 } from "./statuses.js";
import { buildIdQuery } from "../library/utils.js";
import 'dotenv/config';
import { getDb } from "../db/connection.js";

export const addItem = async (req, res) => {
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add new item.',
            schema: { $ref: '#/definitions/AddItem' }
    } */

    // make sure there's a body
    if (!req.body) { err400(res); }

    //make sure body has members
    if (!req.body.name || !req.body.description || !req.body.author || !req.body.statsDelta) {
        err400(res, 'Item you are trying to add is missing information! Make sure you have all required fields.')
    }

    try {
        const newItem = {
            name: req.body.name,
            description: req.body.description,
            author: req.body.author,
            statsDelta: req.body.statsDelta,
        }

        const result = await getDb().collection('items').insertOne(newItem);

        if (result) {
            success201(res, null, `New item added with _id: ${result.insertedId}`)
            console.log(`New item added with _id: ${result.insertedId}`);
        }
    } catch (error) {
        console.log('[server]: CREATE error: ', error);
        err500(res)
    }
}

export const addImage = async (req, res) => { /* [strech goal] */ }

export const getAllItems = async (req, res) => {
    /* */
    try {
        //connect &query database
        const result = await getDb().collection('items').find({})

        //output result
        if (result) {
            const results = await result.toArray();
            success200(res, results, `Found some items!`)
        } else {
            err404(res, `No items found.`)
            console.log(`No items found.`);
        }

    } catch (error) {
        console.log('[server]: GET ALL error: ', error);
        err500(res)
    }
}

export const getItemById = async (req, res) => {
    try {
        //build query args
        console.log(req.params);

        if (!req.params.item_id) {
            err404(res, 'you need to give us a item_id!')
        }

        const itemToGet = buildIdQuery(req.params.item_id)

        //query
        const result = await await getDb().collection('items').findOne(itemToGet);

        if (result) {
            console.log(`Found a item: `, result);
            success200(res, result, `Found an item!`)
        } else {
            err404(res, `No items found.`)
        }
    } catch (error) {
        console.log(`[server]: GET ONE error: `, error);
        err500(res)
    }
}

export const updateItem = async (req, res) => {
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Update item.',
            schema: { $ref: '#/definitions/UpdateItem' }
    } */

    // make sure there's a body
    if (!req.body) { err400(res); }

    try {
        //build query
        const itemToFind = buildIdQuery(req.body.itemId)
        //build update
        const update = {
            $set: {
                name: req.body.name,
                description: req.body.description,
                author: req.body.author,
                statsDelta: req.body.statsDelta,
            }
        }
        const options = req.body.options;
        //send it
        const result = await getDb().collection('items').findOneAndUpdate(itemToFind, update, options);
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

export const deleteItem = async (req, res) => {
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Delete item.',
            schema: { $ref: '#/definitions/DeleteItem' }
    } */

    //use params
    if (!req.params.item_id) {
        err404(res, 'you need to give us a item_id!')
    }

    try {
        const itemToDelete = buildIdQuery(req.params.item_id)

        const result = await getDb().collection('items').deleteOne(itemToDelete)

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
