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
        const encounters = db.collection('encounters');

        const mockEncounter = {
            _id: '12345',
            title: 'Ooh, shiny!',
            flavor: 'You found some loose coins on the ground!',
            description: 'player finds some gold and adds it to their inventory',
            author: 'Mill',
            date: '30/03/24',
            userSubmission: true,
        };
        await encounters.insertOne(mockEncounter);

        const insertedEncounter = await encounters.findOne({ _id: '12345' });
        expect(insertedEncounter).toEqual(mockEncounter);
    });
});