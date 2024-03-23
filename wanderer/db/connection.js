import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';

const uri = process.env.DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

//setup db object
let _db;

export const dbConnect = async (callback) => {
    //callback should take params (err, db_crawler)
    if (_db) {
        console.log('Already connected!');
        callback(null, _db);
    }

    try {
        // Connect the client to the server
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db('admin').command({ ping: 1 });
        console.log('[server]: Pinged your deployment. You successfully connected to MongoDB!');

        //set up db crawler
        _db = client.db(process.env.DB_NAME);
        callback ? callback(null, _db) : console.log('null');;


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

