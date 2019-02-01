const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const pgsql = require('./db/db');

const server = express();
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname,'./client')))

axios.get('/customs', (req, res) => {
    pgsql.query(`SELECT * FROM customizedPokemon`)
    .then((data) => {
        console.log(data);
        // res.send(data)
    })
})

axios.post('/customs', (req,res) => {

})

axios.get('/pokemonDatabase', (req,res) => {
    pgsql.query(`SELECT * FROM pokemonpool`)
    .then((data) => {
        console.log(data);
    })
})


axios.get('/movesDatabase', (req,res) => {

})