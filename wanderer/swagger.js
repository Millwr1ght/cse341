import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Wanderer API',
        description: 'Get game info from the database'
    },
    schemes: [
        "https",
        "http",
    ],
    host: 'wanderer-dymk.onrender.com',
    servers: [
        {
            url: '{protocol}://wanderer-dymk.onrender.com',
            description: 'prod',
            variables: {
                protocol: {
                    enum: [
                        'http',
                        'https',
                    ],
                    default: 'https'
                }
            }
        },
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
};

const outputFile = './swagger.json';
const routes = ['./server.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);