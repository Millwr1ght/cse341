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
        const maps = db.collection('maps');

        const mockMap = {
            _id: '200',
            name: 'crossroads_1',
            tilemap: [
                4, 4, 4, 7, 7, 0, 7, 7,
                4, 4, 4, 7, 7, 1, 7, 7,
                4, 4, 4, 7, 7, 0, 7, 7,
                7, 7, 7, 7, 7, 0, 0, 0,
                7, 7, 7, 0, 0, 0, 7, 7,
                0, 0, 1, 0, 7, 7, 7, 7,
                7, 7, 7, 0, 7, 7, 7, 7,
                7, 7, 7, 0, 7, 7, 7, 7,
            ],
            height: 8,
            width: 8,
            tileset: 'default',
        };
        await maps.insertOne(mockMap);

        const insertedMap = await maps.findOne({ _id: '200' });
        expect(insertedMap).toEqual(mockMap);
    });
});