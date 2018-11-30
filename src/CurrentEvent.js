
import React, { Component } from 'react';
import './App.css';
import Responses from './Responses'

class CurrentEvent extends Component {
  render() {
         return (
          <div>
            <header className="App-header">
              <h3>inviteli</h3>
              <h2>Hey, {this.props.author} wants to {this.props.name}.</h2>
              <Responses
                in={this.props.in}
                out={this.props.out}
              />
                <button className="app_inverseButton" onClick={this.props.copyURL}>copy link</button>
              <br/>
            </header>
            <section>
              <h2>First, who are you?</h2> 
              <input className="landing_input" type= "text" value={this.props.currentUser} onChange={this.props.userInput}/>
              <h2>And are you up for it?</h2>
              <button className="landing_button" onClick={this.props.setIn} type="submit">Yeah! </button>
              <button className="landing_button" onClick={this.props.setOut} type="submit">Nah. </button>
            </section>
        </div> 
         )
  }
}

export default CurrentEvent