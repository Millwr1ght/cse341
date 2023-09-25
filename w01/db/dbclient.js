import { MongoClient } from "mongodb";
import 'dotenv/config'

let _DB;

export default {

    //connection
    async connect(succeeded, failed) {
        try {
            let connection = await MongoClient.connect(process.env.DBconnection);
            _DB = connection.db(process.env.DBname);
            console.log("connected to DB");
            succeeded();
        } catch (error) {
            console.error("db.connect error: ", error);
            failed(error);
        }
    },

    getDB() {
        if (!_DB) {
            throw Error('DB not set up yet.')
        } 
        return _DB;
    },

    //create
    async insertDocument(collection, document) {
        try {
            const result = await this.db.collection(collection).insertOne(document);
            console.log("document inserted with id: ", result);
            return result;
        } catch (error) {
            console.error("db.insertDocument error: ", error);
        }
    },

    //read
    async findDocumentById(collection, idx) {
        try {
            const result = await this.db.collection(collection).findOne({ id: idx });
            if (!result) {
                console.log(`no listing at id: '${idx}'`);
            } else {
                console.log(`document found with id: ${idx}`, result);
                return result
            }
        } catch (error) {
            console.error("db.findDocumentById error: ", error);
        }
    },

    async findDocumentsByQuery(collection, query, limit = 10) {
        try {
            const result = await this.db.collection(collection).find(query).limit(limit);
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

    //update
    //delete
    //close
    async close() {
        return await _DB.close()
    }
}