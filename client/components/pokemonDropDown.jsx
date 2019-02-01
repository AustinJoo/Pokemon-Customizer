import React from 'react';
import Axios from 'axios';

class pokemonDropDown extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pokemonList: [],
            chosenPokemon: undefined
        }
        this.retrievePokemon = this.retrievePokemon.bind(this);
        this.choosePokemon = this.choosePokemon.bind(this);
    }

    componentDidMount(){
        this.retrievePokemon()
    }

    retrievePokemon(){
        Axios.get('/pokemonDatabase')
        .then((data) => {
            console.log(data);
            //this.setState({pokemonList: data.data})
        })
    }

    choosePokemon(event){
        this.setState({chosenPokemon: event.target.value});
    }

    render(){
        return(
            <div id="pokemonListDropDown">
                <select onChange={this.choosePokemon}>
                    {this.pokemonList.map((pokemon) => {
                        <option value={pokemon.id}>{pokemon.pokemonName}</option>
                    })}
                </select>
            </div>
        )
    }
}

export default pokemonDropDown;