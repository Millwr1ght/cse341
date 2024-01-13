import user from "../data/user.json" assert { type: "json"};
import { connectDB } from "../db/connection.js";

export const helloWorld = (req, res) => {
    res.send('Hello World');
};

export const status = (req, res) => {
    res.send(`This server is working!`);
};

export const professional = {
    create: (req, res) => {
        res.json(req.body);
    },
    read: (req, res) => {

        res.json(user);
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