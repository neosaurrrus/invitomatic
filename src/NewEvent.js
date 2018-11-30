
import React, { Component } from 'react';
import './App.css';
import Responses from './Responses'

class NewEvent extends Component {

  jsx = () => {

  }

  render() {
        return (
        <div>
          <header className="App-header">
          <h3>inviteli</h3>
            <h2>Let's {this.state.event.name}!</h2>
          <br/>
          <button className="app_inverseButton" onClick={this.copyURL}>copy link</button>
          <br/>
          </header>
           <Responses
              in={this.state.event.in}
              out={this.state.event.out}
            />
        </div>
      ) 
  }

}

export default NewEvent