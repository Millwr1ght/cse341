import { MongoClient, ServerApiVersion } from "mongodb";
import 'dotenv/config';

const uri = process.env.DB_URI;

const newUser = {
    "_id": 1,
    "professionalName": "Fname Lname",
    "base64Image": "img",
    "nameLink": {
        "firstName": "Fname",
        "url": "localhost:8080/"
    },
    "primaryDescription": "Proto Desc",
    "workDescription1": "Work 1",
    "workDescription2": "Work 2",
    "linkTitleText": "Title Text",
    "linkedInLink": {
        "text": "linkedIn",
        "link": "#"
    },
    "githubLink": {
        "text": "github",
        "link": "#"
    }
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

//setup db object
let _db, _recipesCollection, _cookbooksCollection;

export const dbConnect = async (callback) => {
    //connect to mongodb
    //callback should take params (err, db_crawler)

    if (_db) {
        console.log('Already connected!');
        callback(null, _db);
    }

    try {
        // Connect the client to the server
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        //set up db crawler
        _db = client.db(process.env.DB_NAME);
        callback ? callback(null, _db) : console.log('null');;

        //_recipesCollection = _db.collection('recipes')

    } catch (err) {
        callback(err);
    }
}

export const getDb = () => {
    if (!_db) {
        throw Error('DB not connected.')
    }
    return _db;
};

// export const recipesCollection = () => {
//     if (!_recipesCollection) {
//         throw Error('Collection not found.')
//     }
//     return _recipesCollection;
// }

// async function listDatabases(client) {
//     let databasesList = await client.db().admin().listDatabases();

//     console.log("Databases: ");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };
