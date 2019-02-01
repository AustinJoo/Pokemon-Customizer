//There are 746 moves total according to https://bulbapedia.bulbagarden.net/wiki/List_of_moves
//PokeAPI only has information for moves 1-728

const axios = require('axios');
// const pgsql = require('./db/db');

let movePool = [];
let pokemonPool = [];
//REMEMBER MOVE COUNTER AND POKEMON COUNTER HAVE TO START AT 1
let moveCounter = 725;
let pokemonCounter = 805;

//Move Seeder loop
let moveSeeder = (counter) => {
    axios.get(`https://pokeapi.co/api/v2/move/${counter}`)
    .then((data) => {
        // console.log('ATTACK NUM:  ', data.data.id-1);
        // console.log('ATTACK NAME: ', data.data.name);
        // console.log('ATTACK TYPE: ', data.data.type.name);
        // console.log('DAMAGE TYPE: ', data.data.damage_class.name);
        let move = {
            id: data.data.id-1,
            moveName: data.data.name,
            moveType: data.data.type.name,
            damageType: data.data.damage_class.name
        }
        movePool.push(move);
        counter++;
        if(counter < 729){
            moveSeeder(counter);
        }
        else {
            console.log(movePool);
            // movePool.map((move) => {
            //     console.log(move);
            //     const query = {
            //         text: 'INSERT INTO movePool (id, moveName, moveType, damageClass) VALUES($1, $2, $3, $4)',
            //         values: [move.id, move.moveName, move.moveType, move.damageType]
            //     }
            //     pgsql.query(query)
            //     .catch((err) => {
            //         console.log("THERE WAS AN ERROR WHEN STORING MOVES TO DB")
            //     })
            // })
        }
    })
    .catch((err) => {
        console.log('THERE WAS AN ERROR')
    })
} 

//Pokemon Seeder loop
let pokemonSeeder = (counter) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${counter}`)
    .then((data) => {
        console.log(data.data.id-1);
        console.log(data.data.name);
        // console.log(data.data.types[0].type.name);
        // data.data.types[1] ? console.log(data.data.types[1].type.name) : undefined;
        // console.log(data.data.sprites.front_default);
        // console.log(data.data.sprites.front_shiny);
        let pokemon = {
            id: data.data.id-1,
            pokemonName: data.data.name,
            pokemonType1: data.data.types[0].type.name,
            pokemonType2: (data.data.types[1] ? data.data.types[1].type.name : null),
            sprite: data.data.sprites.front_default,
            shinySprite:  data.data.sprites.front_shiny
        }
        pokemonPool.push(pokemon);
        counter++;
        if(counter < 808){
            pokemonSeeder(counter);
        } else {
            console.log(pokemonPool);
            pokemonPool.map((pokemon) => {
                // console.log(pokemon)
                // const query = {
                //     text: 'INSERT INTO pokemonPool (id, pokemonName, pokemonType1, pokemonType2, sprite, shinySprite) VALUES($1, $2, $3, $4, $5, $6)',
                //     values: [pokemon.id, pokemon.pokemonName, pokemon.pokemonType1, pokemon.pokemonType2, pokemon.sprite, pokemon.shinySprite]
                // }
                // pgsql.query(query)
                // .catch((err) => {
                //     console.log("THERE WAS AN ERROR WHEN STORING POKEMON TO DB")
                // })
            })
        }
    })
    .catch((err) => {
        console.log('THERE WAS AN ERROR STORING POKEMON TO DB')
    })
}
moveSeeder(moveCounter);
pokemonSeeder(pokemonCounter);