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
    host: 'localhost:8080',
    servers: [
        {
            url: 'localhost:8080',
            description: 'dev',
        },
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
        OAuth2: {
            type: 'oauth2',
            authorizationUrl: 'https://github.com/login/oauth/authorize',
            flow: 'implicit',
            scopes: {}, //TODO: this
        }
    },

    definitions: {

        User: {
            //_id: $id,
            username: "pablo",
            password: "picasso",
            playerData: {
                stats: {
                    exp: 0,
                    hp: 10,
                    def: 10,
                    atk: 3,
                    speed: 1,
                    gold: 20,
                },
                inventory: [{
                    item: "gold",
                    quantity: 20
                },
                ]
            },
            profileIsPublic: false,
        },
        AddUser: {
            username: "pablo",
            password: "picasso",
        },
        UpdateUser: {
            $userId: '1234',
            username: "pablo",
            password: "picasso",
            playerData: {
                stats: {
                    exp: 0,
                    hp: 10,
                    def: 10,
                    atk: 3,
                    speed: 1,
                    gold: 20,
                },
                inventory: [{}],
            },
            profileIsPublic: false,
        },
        DeleteUser: {
            $userId: 'you dont need this'
        },
        Item: {
            //itemId: '1',
            name: 'gold',
            description: 'Loose coin',
            author: 'Mill',
            statsDelta: {
                exp: 0,
                hp: 0,
                def: 0,
                atk: 0,
                speed: 0,
                gold: 1,
            }
        },
        AddItem: {
            name: 'gold',
            description: 'Loose coin',
            author: 'Mill',
            statsDelta: {
                exp: 0,
                hp: 0,
                def: 0,
                atk: 0,
                speed: 0,
                gold: 1,
            }
        },
        UpdateItem: {
            $itemId: '1',
            name: 'gold',
            description: 'Loose coin',
            author: 'Mill',
            statsDelta: {
                exp: 0,
                hp: 0,
                def: 0,
                atk: 0,
                speed: 0,
                gold: 1,
            }
        },
        DeleteItem: {
            $itemId: 'you dont need this',
        },
        Map: {
            //mapId: '2',
            name: 'crossroads_1',
            tilemap: [
                4, 4, 4, 7, 7, 0, 7, 7,
                4, 4, 4, 7, 7, 1, 7, 7,
                4, 4, 4, 7, 7, 0, 7, 7,
                7, 7, 7, 7, 7, 0, 0, 0,
                7, 7, 7, 0, 0, 0, 7, 7,
                0, 0, 1, 0, 7, 7, 7, 7,
                7, 7, 7, 0, 7, 7, 7, 7,
                7, 7, 7, 0, 7, 7, 7, 7,
            ],
            height: 8,
            width: 8,
            tileset: 'default',
        },
        AddMap: {
            name: 'crossroads_1',
            tilemap: [
                4, 4, 4, 7, 7, 0, 7, 7,
                4, 4, 4, 7, 7, 1, 7, 7,
                4, 4, 4, 7, 7, 0, 7, 7,
                7, 7, 7, 7, 7, 0, 0, 0,
                7, 7, 7, 0, 0, 0, 7, 7,
                0, 0, 1, 0, 7, 7, 7, 7,
                7, 7, 7, 0, 7, 7, 7, 7,
                7, 7, 7, 0, 7, 7, 7, 7,
            ],
            height: 8,
            width: 8,
            tileset: 'default',
        },
        UpdateMap: {
            $mapId: '2',
            name: 'crossroads_1',
            tilemap: [
                4, 4, 4, 7, 7, 0, 7, 7,
                4, 4, 4, 7, 7, 1, 7, 7,
                4, 4, 4, 7, 7, 0, 7, 7,
                7, 7, 7, 7, 7, 0, 0, 0,
                7, 7, 7, 0, 0, 0, 7, 7,
                0, 0, 1, 0, 7, 7, 7, 7,
                7, 7, 7, 0, 7, 7, 7, 7,
                7, 7, 7, 0, 7, 7, 7, 7,
            ],
            height: 8,
            width: 8,
            tileset: 'default',
        },
        DeleteMap: {
            $mapId: 'you dont need this',
        },
        Encounter: {
            //encounterId: '1234'
            title: 'Ooh, shiny!',
            flavor: 'You found some loose coins on the ground!',
            description: 'player finds some gold and adds it to their inventory',
            author: 'Mill',
            date: '30/03/24',
            userSubmission: true,
        },
        AddEncounter: {
            title: 'Ooh, shiny!',
            flavor: 'You found some loose coins on the ground!',
            description: 'player finds some gold and adds it to their inventory',
            author: 'Mill',
        },
        UpdateEncounter: {
            $encounterId: '1234',
            title: 'Ooh, shiny!',
            flavor: 'You found some loose coins on the ground!',
            description: 'player finds some gold and adds it to their inventory',
            author: 'Mill',
            userSubmission: true,
        },
        DeleteEncounter: {
            $encounterId: 'you dont need this',
        },

    },
};

const outputFile = './swagger.json';
const routes = ['./server.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);