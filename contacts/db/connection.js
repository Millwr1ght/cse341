import { MongoClient, ServerApiVersion, ObjectId, BSON } from "mongodb";
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
let _db, _contactsCollection;

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
        _db = client;
        callback ? callback(null, _db) : console.log('null');;

        _contactsCollection = client.db(process.env.DB_NAME).collection("contacts")

        // make some calls, such as
        //await listDatabases(_db);
        //await getContactById(_db, '650f9e2b75e5bba9d0c9a599');

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

export const contactsCollection = () => {
    if (!_contactsCollection) {
        throw Error('Collection not found.')
    }
    return _contactsCollection;
}

//dbConnect().catch(console.dir);

async function listDatabases(client) {
    let databasesList = await client.db().admin().listDatabases();

    console.log("Databases: ");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};




/* Contacts table crud */
//read
async function getContactByName(client, fName) {
    //query db
    const result = await client.db(process.env.DB_NAME).collection("contacts").findOne({firstName: fName});

    //wait
    console.log(`Looking for anyone named ${fName}. . . .`);

    //output result
    if (result) {
        console.log(`Found someone with first name of ${fName}.`);
        console.log(result);
    } else {
        console.log(`No one with first name of ${fName} found.`);
    }
};

async function getContactById(client, id) {
    //query db

    const bId = new BSON.ObjectId(id)
    const result = await client.db(process.env.DB_NAME).collection("contacts").findOne({_id: bId});

    //output result
    if (result) {
        console.log(`Found someone:`);
        console.log(result);
    } else {
        console.log(`No one found.`);
    }
}

async function getContacts(client) {
    //query db
    const result = await client.db(process.env.DB_NAME).collection("contacts").find({});

    //output result
    if (result) {
        console.log(`Found the following contact(s): `);
        const results = await result.toArray();
        results.forEach((result, i) => {
            console.log(`${i + 1}. name: ${result.firstName} ${result.lastName}`);
            console.log(`   email: ${result.email}`);
            console.log(`   favorite colour: ${result.favoriteColor}`);
            console.log();
        })
    } else {
        console.log(`No one found.`);
    }
}

/* users table crud */
//create
async function addUser(client, userData) {
    //query
    const result = await client.db(process.env.DB_NAME).collection("users").insertOne(userData);

    //output
    console.log(`New user created with the following id: ${result.insertedId}`);
}

//read
async function getUser(client, userId) {
    //query db
    let result = await client.db(process.env.DB_NAME).collection("users").findOne();

    //output result
    if (result) {
        console.log(`Found someone with user ID# ${userId}.`);
        console.log(result);
    } else {
        console.log(`User ID# ${userId} not found.`);
    }
};

async function getAllUsers(err, client) {
    const result = await client.db(process.env.DB_NAME).collection("users").findOne({_id: 1});

    if (result) {
        console.log(result);
        //res.send(result);
    } else {
        console.log(`No users returned.`);
    }
}

//update
async function updateUser(client, userId) {
    //query
    const newData = {"base64Image": "img64"}
    const result = await client.db(process.env.DB_NAME).collection("users").updateOne({ "_id": userId }, { $unset: {"base64img":""}, $set: newData });

    //output
    console.log(`User(s) updated: ${result.modifiedCount}`);
}

//delete
async function deleteUser(client, userId) {
    //query
    const result = await client.db(process.env.DB_NAME).collection("users").deleteOne({ "_id": userId });

    //output
    console.log(`Number of users deleted: ${result.deletedCount}`);
}

