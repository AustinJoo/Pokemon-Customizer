import React from 'react';
import PokemonDropDown from './pokemonDropDown.jsx';
import MovesDropDown from './movesDropDown.jsx';
import Axios from 'axios';

class CreationCenter extends React.Component{
    constructor(props){
        super(props),
        this.state = {
            creatorName: '',
            pokemonID: 0,
            pokemonMove1: 0,
            pokemonMove2: 0,
            pokemonMove3: 0,
            pokemonMove4: 0,
            shiny: false
        };
        this.enterCreator = this.enterCreator.bind(this);
        this.chooseYourPokemon = this.chooseYourPokemon.bind(this);
        this.chooseMove1 = this.chooseMove1.bind(this);
        this.chooseMove2 = this.chooseMove2.bind(this);
        this.chooseMove3 = this.chooseMove3.bind(this);
        this.chooseMove4 = this.chooseMove4.bind(this);
        this.createPokemon = this.createPokemon.bind(this);
    }

    enterCreator(event){
        // console.log(event.target.value);
        this.setState({creatorName: event.target.value})
    }

    chooseYourPokemon(event){
        // console.log('YOU CHOSE POKEMON ID: ', event.target.value);
        this.setState({pokemonID: event.target.value}, () => {
            console.log('THIS IS THE CHOSEN POKEMON ID:', this.state.pokemonID)
        })
    }

    chooseMove1(event){
        // console.log('MOVE 1: ', event.target.value);
        this.setState({pokemonMove1: event.target.value}, () => {
            console.log('THIS IS THE FIRST CHOSEN MOVE ID: ', this.state.pokemonMove1)
        });
    }

    chooseMove2(event){
        // console.log('MOVE 2: ', event.target.value);
        this.setState({pokemonMove2: event.target.value}, () => {
            console.log('THIS IS THE SECOND CHOSEN MOVE ID: ', this.state.pokemonMove2)
        });
    }

    chooseMove3(event){
        // console.log('MOVE 3: ', event.target.value);
        this.setState({pokemonMove3: event.target.value}, () => {
            console.log('THIS IS THE THIRD CHOSEN MOVE ID: ', this.state.pokemonMove3)
        });
    }

    chooseMove4(event){
        // console.log('MOVE 4: ', event.target.value);
        this.setState({pokemonMove4: event.target.value}, () => {
            console.log('THIS IS THE FORTH CHOSEN MOVE ID: ', this.state.pokemonMove4)
        });
    }

    createPokemon(obj){
        if(obj.creatorName === ''){
            alert('INVALID! ENTER A NAME!')
        } else if (obj.pokemonMove1 === obj.pokemonMove2 || 
            obj.pokemonMove1 === obj.pokemonMove3 || 
            obj.pokemonMove1 === obj.pokemonMove4 || 
            obj.pokemonMove2 === obj.pokemonMove3 || 
            obj.pokemonMove2 === obj.pokemonMove4 || 
            obj.pokemonMove3 === obj.pokemonMove4){
            alert('INVALID! CANNOT HAVE DUPLICATE MOVES!')
        } else {
            alert('VALID CHOICES! CREATING POKEMON NOW')
            Axios.post('/customs', {pokemon: obj})
            .then(() => {
                // console.log('UPDATING ALL CUSTOMS')
                this.props.allPokemon();
            })
        }
    }

    render(){
        return(
            <div id='creationCenter'>
                <h3>Create your pokemon!</h3>
                <input type='string' placeholder='Enter Creator Name' onChange={this.enterCreator}/>
                <PokemonDropDown choose={this.chooseYourPokemon}/>
                <MovesDropDown choose={this.chooseMove1}/>
                <MovesDropDown choose={this.chooseMove2}/>
                <MovesDropDown choose={this.chooseMove3}/>
                <MovesDropDown choose={this.chooseMove4}/>
                <input type='checkbox' onChange={() => {this.setState({shiny: !this.state.shiny})}} value="Shiny"/><span> Shiny </span>
                <br></br>
                <button onClick={() => {this.createPokemon({creatorName: this.state.creatorName,
                pokemonID: this.state.pokemonID,
                pokemonMove1: this.state.pokemonMove1,
                pokemonMove2: this.state.pokemonMove2,
                pokemonMove3: this.state.pokemonMove3,
                pokemonMove4: this.state.pokemonMove4,
                shiny: this.state.shiny})}}>CREATE!</button>
            </div>
        )
    }

}

export default CreationCenter;