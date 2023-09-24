import { MongoClient } from "mongodb";
import 'dotenv/config'

let _DB;

export const connectDB = (callback) => {
    if (_DB) {
        console.log('Already ready.');
        callback(null, _DB);
    }
    MongoClient.connect(process.env.DBconnection)
        .then(async (client) => {
            _DB = client;
            await listDatabases(client);
            callback(null, _DB);
        })
        .catch((e) => {
            console.error(`Error: ${e}`);
            callback(e);
        });
    //console.log(_DB);
};

export const getDB = () => { 
    if (!_DB) {
        throw Error('DB not set up yet.')
    } 
    return _DB
};


async function listDatabases(client){
    let databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};