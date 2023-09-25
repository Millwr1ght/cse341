import { query } from "express";
import { ObjectId } from "mongodb";
import dbclient from "../db/dbclient.js";

const collection = "contacts";

export const contacts = {
    create: async (req, res) => {
        console.log("creating contact");

        //build document
        let document = req.body;

        //insert document
        const result = await dbclient.insertDocument(collection, document)
        .then((data)=>{
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(data);
        })
        
    },
    getAll: async (req, res, next) => {
        console.log("getting all contacts: ");
        const data = await dbclient.findAllDocuments(collection)
        .then(() => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(data);
        });
        
    },
    getById: async (req, res, next) => {
        const { id } = req.params;
        console.log(id);
        console.log(`getting contact id: ${id}`);
        let query = {"_id": new ObjectId(id)}
        const result = await dbclient.findDocumentsByQuery(collection, query)
        .then((data) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(data);
        });
    },
    getByQuery: async (req, res, next) => {
        const { query } = req.params;
        console.log(`getting all contacts that match query: ${query}`);
        const result = await dbclient.findDocumentsByQuery(collection, JSON.parse(query))
        .then((data) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(data);
        });
    },
    update: (req, res) => {
        const { id } = req.params;
        res.json(req.body);
    },
    delete: (req, res) => {
        const { id } = req.params;
        res.json(req.body);
    }
};