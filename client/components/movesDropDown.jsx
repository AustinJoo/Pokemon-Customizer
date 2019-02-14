import React from 'react';
import Axios from 'axios';

class MovesDropDown extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            movesList: []
        }
        this.retrieveMoves = this.retrieveMoves.bind(this);
    }

    componentDidMount(){
        this.retrieveMoves()
    }

    retrieveMoves(){
        Axios.get('/movesDatabase')
        .then((data) => {
            // console.log('THIS IS THE LIST OF MOVES RETURNED AT THE MOVE DROP DOWN: ', data.data.rows);
            this.setState({movesList: data.data.rows})
        })
    }

    render(){
        return(
            <select onChange={this.props.choose}>
                {this.state.movesList.map((move) => {
                    move.movename = move.movename[0].toUpperCase() + move.movename.slice(1);
                    return <option value={move.id}>{move.id+1}) {move.movename}</option>
                })}
            </select>
        )
    }
}

export default MovesDropDown;