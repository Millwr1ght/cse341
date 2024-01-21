import express from "express";
import { routes } from "./routes/index.js";


const app = express();
const port = 8080;

// on the home page, show the name of someone you know
app.use('/', routes);

// log if working
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})