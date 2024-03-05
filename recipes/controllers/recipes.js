import { recipesCollection } from "../db/connection.js";
import { err400, err500, success204 } from "./statuses.js";
import { buildIdQuery } from "../library/utils.js";
import 'dotenv/config';

/* --create-- */
export const addRecipe = async (req, res, next) => {
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add new recipe.',
            schema: { $ref: '#/definitions/AddRecipe' }
    } */


    // make sure there's a body
    if (!req.body) { err400(res); }

    //make sure body has members
    if (!req.body.title || !req.body.book || !req.body.pageNumber || !req.body.type) {
        err400(res, 'Recipe you are trying to add is missing information! make sure you have all fields (title, book, pageNumber, type')
    }

    try {
        const payload = {
            title: req.body.title,
            book: req.body.book,
            pageNumber: req.body.pageNumber,
            type: req.body.type,
            allergens: req.body.allergens,
        }

        const result = await recipesCollection().insertOne(payload);

        if (result) {
            res.status(201)
                .send({
                    message: `New recipe added with _id: ${result.insertedId}`
                })
            console.log(`New recipe added with _id: ${result.insertedId}`);
        }
    } catch (error) {
        console.error('POST error: ', error);
        err500(res);
    }
}

/* --read-- */
// get all documents form the recipes table
export const getAllRecipes = async (req, res, next) => {
    try {
        //connect &query database
        const result = await recipesCollection().find({});

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

export const getRecipeById = async (req, res, next) => {
    try {
        //build query args
        console.log(req.params);
        const recipeToGet = buildIdQuery(req.params.recipe_id)

        //query
        const result = await recipesCollection().findOne(recipeToGet);

        if (result) {
            console.log("Found a recipe: ", result);
            res.status(200)
                .send(result);
        } else {
            res.status(404)
                .send("No recipes found :(")
        }
    } catch (error) {
        console.log('GET error: ', error);
        err500(res)
    }

}

/* --update-- */
export const updateRecipebyId = async (req, res, next) => {
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Update recipe.',
            schema: { $ref: '#/definitions/UpdateRecipe' }
    } */



    if (!req.body) { err400(res); }

    try {
        //build query
        const recipeToFind = buildIdQuery(req.body.recipeId)
        //build update
        const update = {
            $set: {
                title: req.body.title,
                book: req.body.book,
                pageNumber: req.body.pageNumber,
                type: req.body.type,
                allergens: req.body.allergens,
            }
        }
        const options = req.body.options;
        //send it
        const result = await recipesCollection().findOneAndUpdate(recipeToFind, update, options);
        if (result) {
            success204(res);
        } else {
            console.log(`Something went wrong :[`);
            err500(res);
        }
    } catch (error) {
        console.error('PUT error: ', error);
        err500(res);
    }
}

/* --delete-- */
export const deleteRecipeById = async (req, res, next) => {
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Delete recipe.',
            schema: { $ref: '#/definitions/DeleteRecipe' }
    } */


    try {
        const recipeToDelete = buildIdQuery(req.body.recipeId);

        const result = await recipesCollection().deleteOne(recipeToDelete)
        if (result.deletedCount === 0) {
            console.log(`Something went wrong :[`);
            err500(res);
        } else {
            success204(res);
        }
    } catch (error) {
        console.error('DELETE error: ', error);
        err500(res);
    }
}