import express from 'express';
import * as dotenv from 'dotenv';
//import db from './db/mongoose.js';
import { dbConnect } from './db/connection.js';
import middlewareWrapper from 'cors';
import bodyParser from 'body-parser';
import routes from './routes/index.js';

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
    }
})
    .then(() => {
        app.listen(port, () => {
            console.log(`[server]: App listening on port ${port}`);
        })
    })
    .catch((err) => {
        console.log(`[server]: server connection error: ${err}`)
    });