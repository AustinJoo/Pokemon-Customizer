//There are 746 moves total according to https://bulbapedia.bulbagarden.net/wiki/List_of_moves
//PokeAPI only has information for moves 1-728

const axios = require('axios');
const pgsql = require('./db/db');
const SQLq = require('sql-template-strings');

let movePool = [];
let pokemonPool = [];
//REMEMBER MOVE COUNTER AND POKEMON COUNTER HAVE TO START AT 1
let moveCounter = 1;
let pokemonCounter = 1;

//Move Seeder loop
let moveSeeder = (counter) => {
    axios.get(`https://pokeapi.co/api/v2/move/${counter}`)
    .then((data) => {
        console.log('ATTACK NUM:  ', data.data.id);
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
            // console.log(movePool[0].moveName);
            let moveQCounter = 0;
            let moveAdder = (array, counter) => {
                if(counter < array.length){
                    let move = array[counter];
                    move.moveName = move.moveName[0].toUpperCase() + move.moveName.slice(1);
                    move.moveType = move.moveType[0].toUpperCase() + move.moveType.slice(1);
                    move.damageType = move.damageType[0].toUpperCase() + move.damageType.slice(1);
                    pgsql.query(SQLq`INSERT INTO 
                        movepool (id, moveName, moveType, damageClass) 
                        VALUES   (${move.id}, ${move.moveName}, ${move.moveType}, ${move.damageType})`)
                    .then(() => {
                        counter++;
                        moveAdder(array,counter);
                    })
                    .catch((err) => {
                        console.log("THERE WAS AN ERROR WHEN STORING MOVES TO DB")
                    })
                }
            }
            moveAdder(movePool, moveQCounter);
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
        console.log('POKEMON NUM: ', data.data.id);
        // console.log(data.data.name);
        // console.log(data.data.types[0].type.name);
        // data.data.types[1] ? console.log(data.data.types[1].type.name) : undefined;
        // console.log(data.data.sprites.front_default);
        // console.log(data.data.sprites.front_shiny);
        data.data.name = data.data.name[0].toUpperCase() + data.data.name.slice(1);
        data.data.types[0].type.name = data.data.types[0].type.name[0].toUpperCase() + data.data.types[0].type.name.slice(1);
        if(data.data.types[1]){
            data.data.types[1].type.name = data.data.types[1].type.name[0].toUpperCase() + data.data.types[1].type.name.slice(1);
        }
        let pokemon = {
            id: data.data.id-1,
            pokemonName: data.data.name,
            pokemonType1: data.data.types[0].type.name,
            pokemonType2: (data.data.types[1] ? data.data.types[1].type.name : "N/A"),
            sprite: data.data.sprites.front_default,
            shinySprite:  data.data.sprites.front_shiny
        }
        pokemonPool.push(pokemon);
        counter++;
        if(counter < 808){
            pokemonSeeder(counter);
        } else {
            // console.log(pokemonPool[0].pokemonName)
            let pokemonQCounter = 0;
            let pokemonAdder = (array, counter) => {
                if(counter < array.length){
                    let pokemon = array[counter];
                    pgsql.query(SQLq`INSERT INTO 
                        pokemonpool (id, pokemonName, pokemonType1, pokemonType2, sprite, shinySprite) 
                        VALUES (${pokemon.id}, ${pokemon.pokemonName}, ${pokemon.pokemonType1}, ${pokemon.pokemonType2}, ${pokemon.sprite}, ${pokemon.shinySprite})`)
                    .then(() => {
                        counter++;
                        pokemonAdder(array,counter);
                    })
                    .catch((err) => {
                        console.log("THERE WAS AN ERROR WHEN STORING POKEMON TO DB")
                    })
                }
            }
            pokemonAdder(pokemonPool, pokemonQCounter);
        }
    })
    .catch((err) => {
        console.log('THERE WAS AN ERROR STORING POKEMON TO DB')
    })
}
moveSeeder(moveCounter);
pokemonSeeder(pokemonCounter);