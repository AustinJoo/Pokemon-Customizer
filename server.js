const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const pgsql = require('./db/db');
const SQLq = require('sql-template-strings');

const server = express();
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname,'./client/dist')))

server.get('/customs', (req, res) => {
    pgsql.query(`SELECT * FROM customizedPokemon`)
    .then((data) => {
        let allCustoms = data.rows
        // console.log('ALL CUSTOMIED POKEMON: ', allCustoms);
        res.send(allCustoms)
    })
})

server.post('/customs', (req,res) => {
    pokemon = req.body.pokemon;
    let move1;
    let move2;
    let move3;
    let move4;
    pgsql.query(SQLq`SELECT * FROM movepool WHERE id = ${pokemon.pokemonMove1} OR id = ${pokemon.pokemonMove2} OR id = ${pokemon.pokemonMove3} OR id = ${pokemon.pokemonMove4}`)
    .then((data) => {
        move1 = data.rows[0];
        move2 = data.rows[1];
        move3 = data.rows[2];
        move4 = data.rows[3];
    })
    .finally(() => {
        pgsql.query(SQLq`SELECT * FROM pokemonpool WHERE id = ${pokemon.pokemonID}`)
        .then((data) => {
            let sprite;
            //data.rows[0] will be the pokemon that user wanted to customize
            let pkmnToUse = data.rows[0]
            if(pokemon.shiny === true){
                sprite = data.rows[0].shinysprite;
            } else {
                sprite = data.rows[0].sprite;
            }
            pokemon.creatorName = pokemon.creatorName[0].toUpperCase() + pokemon.creatorName.slice(1);
            pgsql.query(SQLq`INSERT INTO 
            customizedpokemon (creator, pokename, pokemonimage, pokemontype1, pokemontype2, move1, move2, move3, move4)
            VALUES (${pokemon.creatorName}, ${pkmnToUse.pokemonname}, ${sprite}, ${pkmnToUse.pokemontype1}, ${pkmnToUse.pokemontype2}, ${move1}, ${move2}, ${move3}, ${move4})
            `)
        })
        .finally(() => {
            res.send('success');
        })
    })
})

server.get('/pokemonDatabase', (req,res) => {
    pgsql.query(`SELECT * FROM pokemonpool`)
    .then((data) => {
        // console.log(data);
        res.send(data);
    })
})


server.get('/movesDatabase', (req,res) => {
    pgsql.query(`SELECT * FROM movepool`)
    .then((data) => {
        // console.log(data);
        res.send(data);
    })
})

const port = 2727;
server.listen(port, () => {
    console.log('Listening on port ' + port)
});