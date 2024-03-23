import mongoose from 'mongoose';
import 'dotenv/config';
import { user } from '../models/user.js';
import { encounter } from '../models/encounter.js';

const uri = process.env.DB_URI;

const db = {};

db.mongoose = mongoose;
db.url = uri;
db.user = user(db.mongoose);
db.item;
db.map;
db.encounter = encounter(db.mongoose);

export default db;

// let _db;

// export const dbConnect = async (callback) => {
//     //callback should take params (err, db_crawler)
//     if (_db) {
//         console.log('Already connected!');
//         callback(null, _db);
//     }
//     try {
//         _db = mongoose.connect(process.env.DB_URI)
//         console.log('Connected to database!');

//         callback(null, _db);

//     } catch (error) {
//         console.log(`Connection failed: ${error}`)
//         callback(error);
//     }


// }

// export const getDb = () => {
//     if (!_db) {
//         throw Error('DB not connected.')
//     }
//     return _db;
// };

