import { Collection, MongoClient, ServerApiVersion } from "mongodb";


const uri = (process.env.DB_URI) ? process.env.DB_URI : '';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

//setup db object
let _db: MongoClient, _collection: Collection;

export const dbConnect = async (callback: (err: any, _db?: MongoClient) => void) => {
    //connect to mongodb

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
        _db = client;
        callback ? callback(null, _db) : console.log('null');;

        _collection = client.db(process.env.DB_NAME).collection("jobs")

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

export const getCollection = () => {
    if (!_collection) {
        throw Error('Collection not found.')
    }
    return _collection;
}