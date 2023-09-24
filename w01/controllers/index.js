import { getDB } from "../db/connection.js";

export const helloWorld = (req, res) => {
    res.send('Hello World');
};

export const status = (req, res) => {
    res.send(`This server is working!`);
};

export const getName = (req, res) => {
    res.send('Daniel Owen Robinson.');
};

export const contacts = {
    create: (req, res) => {
        res.json(req.body);
    },
    getAll: async (req, res, next) => {
        console.log("getting all contacts: ")
        const result = await getDB().db("test").collection("contacts").find();
        result.toArray().then((lists)=>{
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        })
        
    },
    getById: (req, res) => {

        res.json();
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