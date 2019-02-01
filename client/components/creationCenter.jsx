import React from 'react';
import pokemonDropDown from './pokemonDropDown.jsx';
import movesDropDown from './movesDropDown.jsx';

class creationCenter extends React.Component{
    constructor(props){
        super(props),
        this.state ={
            creatorName = '',
            pokemonID = undefined,
            pokemonMove1 = undefined,
            pokemonMove2 = undefined,
            pokemonMove3 = undefined,
            pokemonMove4 = undefined
        };
        this.enterCreator = this.enterCreator.bind(this);
        this.chooseYourPokemon = this.chooseYourPokemon.bind(this);
        this.chooseMove1 = this.chooseMove1.bind(this);
        this.chooseMove2 = this.chooseMove2.bind(this);
        this.chooseMove3 = this.chooseMove3.bind(this);
        this.chooseMove4 = this.chooseMove4.bind(this);
    }

    enterCreator(event){
        console.log(event.target.value);
        this.setState({creatorName: event.target.value})
    }

    chooseYourPokemon(event){
        console.log(event.target.value);
        this.setState({pokemonName: event.target.value})
    }

    chooseMove1(event){
        console.log(event.target.value);
        this.setState({pokemonMove1: event.target.value});
    }

    chooseMove2(event){
        console.log(event.target.value);
        this.setState({pokemonMove2: event.target.value});
    }

    chooseMove3(event){
        console.log(event.target.value);
        this.setState({pokemonMove3: event.target.value});
    }

    chooseMove4(event){
        console.log(event.target.value);
        this.setState({pokemonMove4: event.target.value});
    }

    render(){
        return(
            <div id='creationCenter'>
                <h3>Create your pokemon!</h3>
                <input type='string' placeholder='Enter Creator Name' onChange={this.enterCreator}/>
                <pokemonDropDown onChange={this.chooseYourPokemon}/>
            </div>
        )
    }

}