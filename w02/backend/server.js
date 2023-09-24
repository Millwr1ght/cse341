import express from "express";
import { router } from "./routes/index.js";
import { connectDB } from "./db/connection.js";
const app = express();
const port = process.env.port || 8080;
connectDB().catch(console.error);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
}).use("/", router);

//handle 404s
app.use((req,res) => {
    res.status(404).send({url: req.originalUrl + " not found"})
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});