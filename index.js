let debug = require('debug')('app:index');
const express = require('express');
const configDB = require('./src/config');
//const cool = require('cool-ascii-faces');


const app = express();// Created a new web server

// ENABLE THE DEBUGGER
debug.enabled = true;

app.use(express.json());// parse application/json

console.log(debug.enabled);

configDB.startConnection();

// Load all the routes
app.use('/', require('./src/routes'));


//app.get('/cool', (req, res) => res.send(cool()))

// listen on the port 
const port = process.env.PORT || 5000;// GETS the port from the Environmet variables.
app.listen(port, () => {
    debug(`listening on port => ${port}`);
});