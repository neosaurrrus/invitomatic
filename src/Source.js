import React from 'react';
import {Link} from 'react-router-dom'
import './App.css';



class Source extends React.Component {
    state={
        name: null,
        event: null
    }


    

    updateName = event => {
        let newName = event.target.value;
        this.setState({name: newName})
    }
    updateEvent = event => {
        let newEvent = event.target.value;
        this.setState({event: newEvent})
    }

    
    
    render(){
        return (
            <form>
            <input type = "text" onChange={this.updateName} value={this.state.name}/>

            <input type = "text" onChange={this.updateEvent} value={this.state.event}/>

                <Link to={{
                    pathname: `/i/${this.state.name}`,
                    state: this.state
                        }}> <button>Goto to Dest</button> </Link>
            </form>
              
        )

    }
}
export default Source;