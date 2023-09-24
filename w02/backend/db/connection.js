import { MongoClient } from "mongodb";

const URI = "mongodb+srv://dbUser:jApF6iQfpcVfhyrT@cluster0.rmaxfnt.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";


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

