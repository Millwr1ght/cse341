import express from "express";

const app = express();
const port = 3000;

// on the home page, show the name of someone you know
app.get('/', (req, res) => {
    res.send('Emily!')
});

// learning params
app.get('/users/:name', (req, res) => {
    res.send(req.params.name)
})

// log if working
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})