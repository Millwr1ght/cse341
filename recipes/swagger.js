import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Recipes API',
        description: 'It\'s my collection of recipes, but now on mongoDB and accessible via this API!'
    },
    host: 'localhost:8080'
};

const outputFile = './swagger.json';
const routes = ['./server.js'];

/* NOTE: If you are using the express Router, you must pass to the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);