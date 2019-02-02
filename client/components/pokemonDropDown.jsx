import React from 'react';
import Axios from 'axios';

class PokemonDropDown extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pokemonList: []
        }
        this.retrievePokemon = this.retrievePokemon.bind(this);
    }

    componentDidMount(){
        this.retrievePokemon()
    }

    retrievePokemon(){
        Axios.get('/pokemonDatabase')
        .then((data) => {
            // console.log('THIS IS THE LIST OF POKEMON RETURNED AT THE PKMN DROP DOWN: ', data.data.rows);
            this.setState({pokemonList: data.data.rows})
        })
    }

    render(){
        return(
            <select onChange={this.props.choose}>
                {this.state.pokemonList.map((pokemon) => {
                    pokemon.pokemonname = pokemon.pokemonname[0].toUpperCase() + pokemon.pokemonname.slice(1);
                    return <option value={pokemon.id}>{pokemon.id+1}) {pokemon.pokemonname}</option>
                })}
            </select>
        )
    }
}

export default PokemonDropDown;