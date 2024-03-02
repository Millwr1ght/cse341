import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Cookbook Collection API',
        description: 'It\'s my collection of recipes and cookbooks, but now on mongoDB and accessible via this API!'
    },
    host: 'localhost:8080',
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
        OAuth2: {
            type: 'oauth2',
            authorizationUrl: 'https://github.com/login/oauth/authorize',
            flow: 'implicit',
            scopes: {},
        }
    },
    definitions: {

        Cookbook: {
            title: '1001 Bad Recipes',
            subtitle: 'They\'re Really, Really Bad',
            author: 'Hans Andersen',
            pictureDescription: 'N/A',
        },
        AddCookbook: {
            title: '1001 Bad Recipes',
            subtitle: 'They\'re Really, Really Bad',
            author: 'Hans Andersen',
            pictureDescription: 'N/A',
        },
        UpdateCookbook: {
            $id: '1234',
            title: '1001 Bad Recipes',
            subtitle: 'Like, Really, Really, Really Bad',
            author: 'Khans Andersen',
            pictureDescription: 'N/A',
        },
        Recipe: {
            title: 'Carrot Bran Muffins',
            book: '1001 Bad Recipes',
            pageNumber: 24,
            type: 'Side',
            allergens: {
                dairy: false,
                peanuts: false,
                treenuts: false,
                eggs: false,
                meatNotFish: false,
                fish: false,
                shellfish: false,
                gluten: false,
                soy: false,
                sesame: false,
                alcohol: false,
            },
        },
        AddRecipe: {
            $title: 'Carrot Bran Muffins',
            $book: '1001 Bad Recipes',
            $pageNumber: 24,
            $type: 'Side',
            $allergens: {
                dairy: false,
                peanuts: false,
                treenuts: false,
                eggs: false,
                meatNotFish: false,
                fish: false,
                shellfish: false,
                gluten: false,
                soy: false,
                sesame: false,
                alcohol: false,
            },
        },
        UpdateRecipe: {
            $id: '1234',
            title: 'Carrot Bran Muffins',
            book: '1001 Bad Recipes',
            pageNumber: 24,
            type: 'Side',
            allergens: {
                dairy: false,
                peanuts: false,
                treenuts: false,
                eggs: false,
                meatNotFish: false,
                fish: false,
                shellfish: false,
                gluten: false,
                soy: false,
                sesame: false,
                alcohol: false,
            },
        },

    },

};

const outputFile = './swagger.json';
const routes = ['./server.js'];

/* NOTE: If you are using the express Router, you must pass to the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);