import React from 'react';
import {Link} from 'react-router-dom'
import './App.css';

class Landing extends React.Component {
    state = {
        author: "",
        name: "",
        duration: 90,
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
    updateDuration = event => { //Updates the event name in State
        console.log(event)
        let newDuration = event.target.value;
        this.setState({
            duration: newDuration
        })
    }

    parseURL = () => { //makes the URL string by combining author, name and some random digits.
        let random3Digits = Math.floor((Math.random() * 1000))
        let newURL = `${this.state.author.toLowerCase()}-${this.state.name.toLowerCase()}-${random3Digits}`
        newURL = newURL.replace(/\s+/g, '');
        return newURL;
    }


    render(){
        return (
        <div className="App">
            <header className="App-header">
                <h1>make time for good times</h1>
                <p>a no-fuss site to figure out what dates people can make.</p>
            </header>
            <section className="landing_section">
                <h2>First off, just two simple questions.</h2>
                <h3>Your name is: </h3>
                <input className="landing_input" type= "text" onChange={this.updateAuthor} value={this.state.author}/>
                <h3> And you want to: </h3>
                <input className="landing_input" type= "text" onChange={this.updateName} value={this.state.name}/>
                <br/>
                <br/>
                <Link to={{
                        pathname: `/i/${this.parseURL()}`,
                        state: this.state
                        }}> <button className="landing_button" type="submit">Pick Some dates &rarr;</button>
                </Link>
            </section>
            

        </div>
        )
    }
}
export default Landing;