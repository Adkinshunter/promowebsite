
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://hunter:<love>@cluster0.bluzc2j.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/subscribe', (req, res) => {
    const { email } = req.body;

    // Save the email to a file (or you can use a database)
    fs.appendFile('subscribers.txt', email + '\n', (err) => {
        if (err) throw err;
        console.log('Email saved:', email);
    });

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
