const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Replace with your actual MongoDB connection string
const uri = "mongodb+srv://hunter:love@cluster0.bluzc2j.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    try {
        await client.connect();
        const database = client.db('Hunter'); // Replace with your database name
        const collection = database.collection('subscribers');
        await collection.insertOne({ email });
        console.log('Email saved to MongoDB:', email);
    } finally {
        await client.close();
    }

    res.send('Subscription successful!');
});

// Serve the HTML and CSS files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'styles.css'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
