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
