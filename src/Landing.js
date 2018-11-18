import React from 'react';
import {Link} from 'react-router-dom'
import './App.css';

class Landing extends React.Component {

    state = {
        author: null,
        name: null
    }


    updateAuthor = event => {
        let newAuthor = event.target.value;
        this.setState({
            author: newAuthor
        })
    }
    updateName = event => {
        let newName = event.target.value;
        this.setState({
            name: newName
        })
    }



    render(){
        return (
        <div className="App">

            <header className="App-header">
                <h1>Invitomatic</h1>
                <h2>Make Time for Good Times.</h2>
            </header>

            <h3>My name is... </h3>
            <input type= "text" onChange={this.updateAuthor} value={this.state.author}/>
            <h3> I want to... </h3>
            <input type= "text" onChange={this.updateName} value={this.state.name}/>
            <h3> Within 3 Months </h3>

            <Link to={{
                    pathname: `/i/${this.state.author}-${this.state.name}-${Date.now()}`,
                    state: this.state
                        }}> <button type="submit">Let's see what we can do! &rarr;</button>
            </Link>

        </div>
        )
    }
}
export default Landing;