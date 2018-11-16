import React from 'react';
import './App.css';

class Landing extends React.Component {
    inviteInput = React.createRef();
    nameInput = React.createRef();
    goToInvite = event => {
        event.preventDefault();
        this.props.history.author = this.nameInput.current.value;
        this.props.history.event = this.inviteInput.current.value;
        this.props.history.push(`/i/${this.props.history.author}-${this.props.history.event}-${Date.now()}`);
    }
    render(){
        return (
        <div className="App">
            <header className="App-header">
                <h1>Invitomatic</h1>
                <h2>Make Time for Good Times.</h2>
            </header>
            <form className="invite-selector" onSubmit={this.goToInvite}>
                <h3>My name is... </h3>
                <input type = "text" ref = {this.nameInput} required placeholder = "your name" defaultValue = "anon"/>
                <h3> I want to... </h3>
                <input type= "text" ref={this.inviteInput} required placeholder="do something"  defaultValue = "something"/>
                <h3> Within 3 Months </h3>
            <button type="submit">Let's see what we can do! &rarr;</button>
            </form>
        </div>
        )
    }
}
export default Landing;