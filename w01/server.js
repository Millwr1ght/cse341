import express from "express";

import dbclient from "./db/dbclient.js";
import { router } from "./routes/index.js";

const app = express(); //this is the server!
const port = 3000;


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
}).use("/", router);


dbclient.connect(
    () => {
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });

        dbclient.getDB().collection("contacts").find().toArray().then((data)=> {console.log(data)});
    },
    (error)=> {
        console.error(error);
    }
);