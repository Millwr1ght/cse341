import express from "express";
import * as dotenv from "dotenv";
import routes from "./routes/index.js";
import { dbConnect } from "./db/connection.js";
import middlewareWrapper from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app
    .use(middlewareWrapper())
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', routes);



dbConnect((err, mongodb) => {
    if (err) {
        console.log(err)
    } else {
        app.listen(port, () => {
            console.log(`[server]: App listening on port ${port}`);
        })
    }
})