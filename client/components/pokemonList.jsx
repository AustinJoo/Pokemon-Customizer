import React from 'react';

const PokemonList = (props) => {
    return(
        <div id='creations'>
            <h1>Customized Pokemon</h1>
            {props.pokemon.map((pokemon) => {
                console.log(pokemon);
                return(<div id={pokemon.id} class='pokemonListing'>
                <h2 className='creatorName'>{pokemon.creator}'s {pokemon.pokename}</h2>
                <img src={pokemon.pokemonimage} class='sprite'/>
                <div class='pokemonInfo'>
                    <h4 class='category'>TYPE: </h4>
                        <ul className='types'>
                            <li>{pokemon.pokemontype1}</li>
                            <li>{pokemon.pokemontype2}</li>
                        </ul>
                    <h4 class='category'>ATTACKS: </h4>
                        <ul class='attackList'>
                            <li class='attackName'>{pokemon.move1.movename}</li>
                            <li class='attackName'>{pokemon.move2.movename}</li>
                            <li class='attackName'>{pokemon.move3.movename}</li>
                            <li class='attackName'>{pokemon.move4.movename}</li>
                        </ul>
                </div>
                </div>)
            })}
        </div>
    )
}

export default PokemonList;