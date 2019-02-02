import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import PokemonList from './components/pokemonList.jsx';
import CreationCenter from './components/creationCenter.jsx';

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            allPokemon: []
        };
        this.getAllCustoms = this.getAllCustoms.bind(this)
    }

    componentDidMount(){
        this.getAllCustoms();
    }

    getAllCustoms(){
        Axios.get('/customs')
        .then((data) => {
            console.log(data.data);
            this.setState({allPokemon: data.data});
        })
    };

    render(){
        return(
            <div>
                <CreationCenter allPokemon={this.getAllCustoms}/>
                <PokemonList pokemon={this.state.allPokemon}/>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"))