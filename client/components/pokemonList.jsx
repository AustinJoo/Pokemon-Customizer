import React from 'react';

const pokemonList = (props) => {
    <div>
        <h1>Customized Pokemon</h1>
        {props.pokemon.map((pokemon) => {
            console.log('hello');
        })}
    </div>
}

export default pokemonList;