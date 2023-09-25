import dbclient from "../db/dbclient.js";

export const contacts = {
    create: (req, res) => {
        res.json(req.body);
    },
    getAll: async (req, res, next) => {
        console.log("getting all contacts: ");
        const result = await dbclient.getDB().collection("contacts").find();
        result.toArray().then((contacts)=>{
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts);
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