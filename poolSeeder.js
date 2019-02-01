//There are 746 moves total according to https://bulbapedia.bulbagarden.net/wiki/List_of_moves
//PokeAPI only has information for moves 1-728

const axios = require('axios');
const pgsql = require('./db/db');

let movePool = [];
//REMEMBER MOVE COUNTER AND POKEMON COUNTER HAVE TO START AT 1
let moveCounter = 1;

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
            movePool.map((move) => {
                const query = {
                    text: 'INSERT INTO movePool (id, moveName, moveType, damageClass) VALUES($1, $2, $3, $4)',
                    values: [move.id, move.moveName, move.moveType, move.damageType]
                }
                pgsql.query(query)
                .catch((err) => {
                    console.log("THERE WAS AN ERROR WHEN STORING INTO THE DATABASE: ", err)
                })
            })
        }
    })
    .catch((err) => {
        console.log('THERE WAS AN ERROR')
    })
} 
moveSeeder(moveCounter);
//Pokemon Seeder loop