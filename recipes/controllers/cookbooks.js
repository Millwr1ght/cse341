import { cookbooksCollection } from "../db/connection.js";
import { err400, err500, success204 } from "./statuses.js";
import { buildIdQuery } from "../library/utils.js";
import 'dotenv/config';

/* --create-- */
export const addCookbook = async (req, res, next) => {
    /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Add new cookbook.',
        schema: { $ref: '#/definitions/AddCookbook' }
    } */

    // make sure there's a body
    if (!req.body) { err400(res); }

    //make sure body has members
    if (!req.body.title || !req.body.book || !req.body.pageNumber || !req.body.type) {
        err400(res, 'Cookbook you are trying to add is missing information! make sure you have all fields (title, book, pageNumber, type')
    }

    try {
        const payload = {
            title: req.body.title,
            book: req.body.book,
            pageNumber: req.body.pageNumber,
            type: req.body.type,
            allergens: req.body.allergens,
        }

        const result = await cookbooksCollection().insertOne(payload);

        if (result) {
            res.status(201)
                .send({
                    message: `New cookbook added with _id: ${result.insertedId}`
                })
            console.log(`New cookbook added with _id: ${result.insertedId}`);
        }
    } catch (error) {
        console.error(error);
        err500(res);
    }
}


/* --read-- */
// get all documents form the cookbooks table
export const getAllCookbooks = async (req, res, next) => {
    //connect &query database
    try {
        const result = await cookbooksCollection().find({});

        //output result
        if (result) {
            const results = await result.toArray();
            res.status(200)
                .send(results);
        } else {
            res.status(404)
                .send(`No cookbooks found.`)
            console.log(`No cookbooks found.`);
        }
    } catch (error) {
        console.log(error);
        err500(res);
    }

}

export const getCookbookById = async (req, res, next) => {
    try {
        //build query args
        console.log(req.params);
        const cookbookToGet = buildIdQuery(req.params.cookbook_id)

        //query
        const result = await cookbooksCollection().findOne(cookbookToGet);

        if (result) {
            console.log("Found a cookbook: ", result);
            res.status(200)
                .send(result);
        } else {
            res.status(404)
                .send("No cookbooks found :(")
        }
    } catch (error) {
        console.log(error);
        err500(res)
    }

}

/* --update-- */
export const updateCookbookbyId = async (req, res, next) => {
    /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Update cookbook.',
        schema: { $ref: '#/definitions/UpdateCookbook' }
    } */

    if (!req.body) { err400(res); }

    try {
        //build query
        const cookbookToFind = buildIdQuery(req.body.cookbookId)
        //build update
        const update = {
            $set: {
                title: req.body.title,
                book: req.body.book,
                pageNumber: req.body.pageNumber,
                type: req.body.type
            }
        }
        const options = req.body.options;
        //send it
        const result = await cookbooksCollection().findOneAndUpdate(cookbookToFind, update, options);
        if (result) {
            success204(res);
        } else {
            err500(res);
        }
    } catch (error) {
        console.error(error);
        err500(res);
    }
}

/* --delete-- */
export const deleteCookbookById = async (req, res, next) => {
    /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Delete recipe.',
        schema: { $ref: '#/definitions/DeleteRecipe' }
    } */


    try {
        const cookbookToDelete = buildIdQuery(req.body.cookbookId);

        const result = await cookbooksCollection().deleteOne(cookbookToDelete)
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