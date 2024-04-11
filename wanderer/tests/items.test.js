import { jest } from '@jest/globals';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

describe('insert encounter', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db(process.env.DB_NAME);
    });

    afterAll(async () => {
        await connection.close();
    });

    it('should insert a doc into collection', async () => {
        const items = db.collection('items');

        const mockItem = {
            _id: '100',
            name: 'gold',
            description: 'Loose coin',
            author: 'Mill',
            statsDelta: {
                exp: 0,
                hp: 0,
                def: 0,
                atk: 0,
                speed: 0,
                gold: 1,
            }
        };
        await items.insertOne(mockItem);

        const insertedItem = await items.findOne({ _id: '100' });
        expect(insertedItem).toEqual(mockItem);
    });
});