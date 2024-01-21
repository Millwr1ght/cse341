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
export const dbConnect = async (callback, data) => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // make some calls
    await listDatabases(client);

    //try the callback, if any
    callback 
      ? await callback(client, data)
      : console.log('nevermind');

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
dbConnect(addUser, newUser).catch(console.dir);

async function listDatabases(client) {
    let databasesList = await client.db().admin().listDatabases();

    console.log("Databases: ");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

//read
async function getContact(client, fName) {
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