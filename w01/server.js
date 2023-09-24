import express from "express";
import { connectDB } from "./db/connection.js";
import { router } from "./routes/index.js";
import { contacts } from "./controllers/index.js";
const app = express(); //this is the server!
const port = 3000;


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
}).use("/", router);

connectDB((error, connection) => {
    if (error) {
        console.error(error);
    } else {
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });

        connection.db("test").collection("contacts").find().toArray().then((data)=> {console.log(data)});
    }
});