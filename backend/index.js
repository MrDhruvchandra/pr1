const express = require('express');
const cors = require('cors'); // Import the cors middleware
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// Connection URL
const url = 'mongodb+srv://dhruv:Dhruv%408317@cluster0.qhhaeax.mongodb.net/'; // Your MongoDB URI
const dbName = 'rsac'; // Your database name

let db;

// Middleware
app.use(cors()); // Use CORS middleware to handle CORS issues
app.use(express.json()); // Optional: Handle JSON payloads

// Connect to MongoDB
(async function connectToMongoDB() {
    try {
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db(dbName);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
})();

// Route to fetch GeoJSON data
app.get('/geojson', async (req, res) => {
    try {
        const collection = db.collection('rsac'); // Replace with your collection name
        const data = await collection.findOne({}); // Assumes you have only one document or modify as needed
        res.json(data);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
