import React from 'react';
import {Link} from 'react-router-dom'
import './App.css';

class Landing extends React.Component { //Component responsible for Event Creation
    state = {
        author: "",
        name: "",
        duration: 90,
        ready: false
    }
    updateAuthor = event => { //Updates the Author in State
        let authorArray = Array.from(event.target.value);
        let newAuthor = authorArray.map((letter,index) => {
            if (index === 0 ){
                return letter.toUpperCase()
            }
            else return letter;
        }).join('');
        
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

    showLink = () => {
        if (this.state.author.length > 0 && this.state.name.length > 0){
            return (
            <Link to={{
                pathname: `/i/${this.parseURL()}`,
                state: this.state
                }}> <button className="landing_button" type="submit">Lets Find Time</button>
            </Link>
           ) 
        }
    }

    render(){
        return (
        <div className="App">
            <header className="App-header">
                <h1 className="logo">inviteli</h1>
                <strong>Find time for good times.</strong>
            </header>
            <section className="landing_section">
                <h4>What's your name?</h4>
                <input className="landing_input" type= "text" maxLength="12" onChange={this.updateAuthor} value={this.state.author}/>
                <h4> What do you want to do with your friends? </h4>
                <p className="small_text">e.g "go whitewater rafting"</p>
                <input className="landing_input" type= "text" maxLength="25" onChange={this.updateName} value={this.state.name}/>
                <br/>
                <br/>
                {this.showLink()}
            </section>
        </div>
        )
    }
}
export default Landing;