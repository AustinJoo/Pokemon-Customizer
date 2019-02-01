const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const pgsql = require('./db/db');

const server = express();
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname,'./client')))

axios.post('/pokemonDatabase', (req,res) => {

})

axios.get('/pokemonDatabase', (req, res) => {
    
})