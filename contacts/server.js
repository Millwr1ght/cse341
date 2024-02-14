import express from "express";
import { routes } from "./routes/index.js";
import { dbConnect } from "./db/connection.js";
import bodyParser from "body-parser";
import middlewareWrapper from "cors";


const app = express();
const port = 8080;

app
    .use(middlewareWrapper())
    .use(bodyParser.json())
    // .use((req, res, next) => {
    //     res.setHeader('Access-Control-Allow-Origin', '*');
    //     next();
    // })
    .use('/', routes);

// log if working

dbConnect((err, mongodb) => {
    if (err) {
        console.log(err)
    } else {
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        })
    }
})
