import express, { Request, Response } from "express";
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './graphql/schema';
import * as dotenv from "dotenv";
import routes from "./routes/index";
import { dbConnect } from "./config/connection";
import middlewareWrapper from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app
    .all('/graphql', createHandler({ schema }))
    .use(middlewareWrapper())
    .use((req: Request, res: Response, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', routes);

// log if working

dbConnect((err, mongodb) => {
    if (err) {
        console.log(err)
    } else {
        app.listen(port, () => {
            console.log(`[server]: App listening on port ${port}`);
        })
    }
})
