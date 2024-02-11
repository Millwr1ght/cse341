const routes = require('express').Router();
const temple = require('./temple');
const swagger = require('./swagger')

routes.use('/temples', temple);
routes.use('/api-docs', swagger);
routes.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      documentationURL: 'https://nathanbirch.github.io/nathan-byui-api-docs',
    };
    res.send(docData);
  })
);

module.exports = routes;
