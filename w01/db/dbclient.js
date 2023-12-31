import { MongoClient } from "mongodb";
import 'dotenv/config'

let _DB;

//connection
async function connect(succeeded, failed) {
    try {
        let connection = await MongoClient.connect(process.env.MONGODB_URI, (err, database) => {
            if(err){ throw err }
            _DB = database;
            console.log("connected to DB");
        });
        //_DB = connection.db(process.env.MONGODB_DB);
        succeeded();
    } catch (error) {
        console.error("db.connect error: ", error);
        failed(error);
    }
}

function getDB() {
    if (!_DB) {
        throw Error('DB not set up yet.');
    } 
    return _DB;
}

async function close() {
    return await getDB().close()
}

export default {

    //connection
    connect,
    getDB,
    close,

    //create
    async insertDocument(collection, document) {
        try {
            let result = await getDB().collection(collection).insertOne(document);
            console.log("document inserted with id: ", result);
            return result;
        } catch (error) {
            console.error("db.insertDocument error: ", error);
        }
    },

    //read
    async findDocumentsByQuery(collection, query = {}, limit = 10) {
        try {
            let result = await getDB().collection(collection).find(query).limit(limit);
            if (!result) {
                console.log(`no documents found that match query ${query}`);
            } else {
                result = result.toArray();
                console.log("document(s) found: ", result);
                return result;
            }
        } catch (error) {
            console.error("db.findDocumentsByQuery error: ", error);
        }
    },

    async findAllDocuments(collection) {
        try {
            let result = await getDB().collection(collection).find();
            if (!result) {
                console.log("no documents...? huh.");
            } else {
                result = result.toArray();
                console.log("document(s) found: ", result);
                return result;
            }
        } catch (error) {
            console.error("db.findAllDocuments error: ", error);
        }
    },

    //update
    //delete
}