import { err400, err500, success204 } from "./statuses.js";
import { buildIdQuery } from "../library/utils.js";
import 'dotenv/config';
import db from "../db/mongoose.js";

const MAP = db.map

export const addMap = (req, res) => {
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add new map.',
            schema: { $ref: '#/definitions/AddMap' }
    } */

    const newMap = {
        name: req.body.name,
        tilemap: req.body.tilemap,
        height: req.body.height,
        width: req.body.width,
    }


    try {
        MAP.create()
    } catch (error) {
        console.log('[server]: CREATE error: ', error);
        err500(res)
    }
}

export const getAllMaps = (req, res) => { /* */ }

export const getMapById = (req, res) => { /* */ }

export const updateMap = (req, res) => { /* */ }

export const deleteMap = (req, res) => { /* */ }
