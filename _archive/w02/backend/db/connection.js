import { MongoClient } from "mongodb";
import 'dotenv/config'

const URI = process.env.DBconnection;


async function listDatabases(client){
    let databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

export const connectDB = async () => {
    const client = new MongoClient(URI);
    
    try {
        await client.connect();
        //await listDatabases(client);
    } catch (error) {
        console.error(error);
    }
    finally {
        await client.close();
    }
}

