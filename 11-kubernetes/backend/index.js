const express = require('express');
const app = express();
const { Pool } = require('pg');
const { MongoClient } = require('mongodb');

// PostgreSQL connection
const pgPool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: 5432,
});

// MongoDB connection
const mongoUri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:27017`; 
let mongoClient;

app.use(express.json());

app.get('/api/data', async (req, res) => {
    try {
        // Fetch data from PostgreSQL
        const pgResult = await pgPool.query('SELECT NOW()');
        const pgData = pgResult.rows;

        // Fetch data from MongoDB
        if (!mongoClient) {
            mongoClient = new MongoClient(mongoUri, {authSource: 'admin'});
            await mongoClient.connect();
        }
        const db = mongoClient.db('test');
        const mongoData = await db.collection('demo').find({}).toArray();

        res.json({ pgData, mongoData });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error', errorDetails: error });
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
