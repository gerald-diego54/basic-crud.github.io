// Declare the Core Modules
const express = require('express');
const port = process.env.PORT || 5000;
const dotenv = require('dotenv');

const app = express();

// Database Integrity
dotenv.config({path: './.env'});

// Setting up the View Architecture
app.set('view engine', 'hbs');

// Body Parse
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// Setting up the Route Folders
app.use('/request', require('./routes/request'));
app.use('/', require('./routes/response'));



// Initiate the Port Connection from the Local Server
app.listen(
    port,
    (request, response) => {
        console.log(`Secure connection established at port ${port}...`);
    }
);