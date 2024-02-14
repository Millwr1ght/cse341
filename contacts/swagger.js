import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Contacts API',
        description: 'It\'s a contacts list, but also an API! Add, update, and delete all your friends and acquaintances!'
    },
    host: 'localhost:8080'
};

const outputFile = './swagger.json';
const routes = ['./server.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);