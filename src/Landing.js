import React from 'react';
import {Link} from 'react-router-dom'
import './App.css';

class Landing extends React.Component {
    state = {
        author: null,
        name: null
    }
    updateAuthor = event => { //Updates the Author in State
        let newAuthor = event.target.value;
        this.setState({
            author: newAuthor
        })
    }
    updateName = event => { //Updates the event name in State
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
            <section className="landing_section">
                <h3>My name is... </h3>
                <input className="landing_input" type= "text" onChange={this.updateAuthor} value={this.state.author}/>
                <h3> and I want to... </h3>
                <input className="landing_input" type= "text" onChange={this.updateName} value={this.state.name}/>
                <h3> Within 3 Months </h3>
                <Link to={{
                        pathname: `/i/${this.state.author}-${this.state.name}-${Date.now()}`,
                        state: this.state
                            }}> <button className="landing_button" type="submit">Find the Time &rarr;</button>
                </Link>
            </section>
            
           

        </div>
        )
    }
}
export default Landing;