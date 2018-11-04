import React from 'react';
import './App.css';

class Landing extends React.Component {
    inviteInput = React.createRef();
    nameInput = React.createRef();
    goToInvite = event => {
        event.preventDefault();
        const inviteName = this.inviteInput.current.value;
        const yourName = this.nameInput.current.value;
        this.props.history.push(`/i/${yourName}-${inviteName}-${Date.now()}`);
    }
    render(){
        return (
        <div className="App">
            <header className="App-header">
                <h1>Invitomatic</h1>
            </header>
            <form className="invite-selector" onSubmit={this.goToInvite}>
                <h2>Make time for Good Times.</h2>
                <h3>My name is... </h3>
                <input type = "text" ref = {this.nameInput} required placeholder = "your name" defaultValue = "anon"/>
                <h3> I want to... </h3>
                <input type= "text" ref={this.inviteInput} required placeholder="do something"  defaultValue = "something"/>
                <h3> On any of these dates... </h3>
                <p>To be done!</p>
            <button type="submit">Let's see whats doable! &rarr;</button>
            </form>
        </div>
        )
    }
}
export default Landing;